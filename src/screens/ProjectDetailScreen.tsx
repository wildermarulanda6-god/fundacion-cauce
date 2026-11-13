import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCreateDonation, useDeleteDonation, useDonations, useProject } from '@/api/queries';
import { ErrorState } from '@/components/ErrorState';
import { ListRow } from '@/components/ListRow';
import { LoadingState } from '@/components/LoadingState';
import { ProgressRail } from '@/components/ProgressRail';
import { beneficiaries, donors, reports } from '@/data/mockData';
import type { RootStackParamList } from '@/navigation/types';
import { COLORS, RADIUS, SPACING, STATUS_COLOR, STATUS_LABEL, TYPOGRAPHY } from '@/theme';
import { formatCop, percentOf } from '@/utils/format';
import { ATTENTION_LABEL, DONOR_KIND_LABEL } from '@/utils/labels';

type ProjectDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function ProjectDetailScreen({ route, navigation }: ProjectDetailProps) {
  const { projectId } = route.params;
  const { data: project, isPending, isError, error, refetch } = useProject(projectId);
  const { data: donations, isPending: donationsPending } = useDonations(projectId);
  const { mutate: donate, isPending: isDonating, error: donateError, reset: resetDonate } = useCreateDonation(projectId);
  const { mutate: removeDonation, isPending: isRemoving } = useDeleteDonation();

  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = useCallback(() => {
    donate(
      { donorName, amount: Number(amount.replace(/\D/g, '')) },
      {
        onSuccess: () => {
          setDonorName('');
          setAmount('');
        },
      },
    );
  }, [donate, donorName, amount]);

  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  const handleEdit = useCallback(
    () => navigation.navigate('ProjectForm', { projectId }),
    [navigation, projectId],
  );

  if (isPending) {
    return <LoadingState />;
  }
  if (isError) {
    return <ErrorState message={error.message} onRetry={handleRetry} />;
  }

  const percent = percentOf(project.raisedAmount, project.goalAmount);
  const projectDonors = donors.filter((item) => project.donorIds.includes(item.id));
  const projectBeneficiaries = beneficiaries.filter((item) => project.beneficiaryIds.includes(item.id));
  const projectReports = reports.filter((item) => project.reportIds.includes(item.id));
  const newDonations = donations ?? [];

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Image source={{ uri: project.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.meta}>{`${project.location} · ${STATUS_LABEL[project.status]}`}</Text>
        <Text style={styles.summary}>{project.summary}</Text>
        <ProgressRail percent={percent} color={STATUS_COLOR[project.status]} />
        <Text style={styles.money}>
          {`${formatCop(project.raisedAmount)} de ${formatCop(project.goalAmount)} (${percent}%)`}
        </Text>

                <Pressable
          onPress={handleEdit}
          style={({ pressed }) => [styles.editButton, pressed && styles.buttonPressed]}
          accessibilityRole="button"
        >
          <Text style={styles.editText}>Editar proyecto</Text>
        </Pressable>

        <Section title="Haz una donación">
          <TextInput
            value={donorName}
            onChangeText={(text) => {
              resetDonate();
              setDonorName(text);
            }}
            placeholder="Tu nombre"
            placeholderTextColor={COLORS.pizarra}
            style={styles.input}
            accessibilityLabel="Nombre del donante"
          />
          <TextInput
            value={amount}
            onChangeText={(text) => {
              resetDonate();
              setAmount(text);
            }}
            placeholder="Monto en pesos"
            placeholderTextColor={COLORS.pizarra}
            keyboardType="number-pad"
            style={styles.input}
            accessibilityLabel="Monto de la donación"
          />
          {donateError ? <Text style={styles.error}>{donateError.message}</Text> : null}
          <Pressable
            onPress={handleSubmit}
            disabled={isDonating}
            style={({ pressed }) => [styles.button, (pressed || isDonating) && styles.buttonPressed]}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>{isDonating ? 'Enviando…' : 'Donar'}</Text>
          </Pressable>
        </Section>

        <Section title={`Donaciones nuevas (${newDonations.length})`}>
          {donationsPending ? <Text style={styles.summary}>Cargando donaciones…</Text> : null}
          {!donationsPending && newDonations.length === 0 ? (
            <Text style={styles.summary}>Todavía no hay donaciones nuevas.</Text>
          ) : null}
          {newDonations.map((item) => (
            <View key={item.id} style={styles.donationItem}>
              <ListRow title={item.donorName} subtitle={item.createdAt} trailing={formatCop(item.amount)} />
              <Pressable
                onPress={() => removeDonation(item.id)}
                disabled={isRemoving}
                style={styles.remove}
                accessibilityRole="button"
              >
                <Text style={styles.removeText}>Eliminar</Text>
              </Pressable>
            </View>
          ))}
        </Section>

        <Section title={`Donantes (${projectDonors.length})`}>
          {projectDonors.map((item) => (
            <ListRow
              key={item.id}
              title={item.name}
              subtitle={DONOR_KIND_LABEL[item.kind]}
              trailing={formatCop(item.totalDonated)}
            />
          ))}
        </Section>

        <Section title={`Beneficiarios (${projectBeneficiaries.length})`}>
          {projectBeneficiaries.map((item) => (
            <ListRow
              key={item.id}
              title={item.name}
              subtitle={item.city}
              trailing={ATTENTION_LABEL[item.attention]}
            />
          ))}
        </Section>

        <Section title={`Informes (${projectReports.length})`}>
          {projectReports.map((item) => (
            <ListRow key={item.id} title={item.title} subtitle="Publicado" trailing={item.publishedAt} />
          ))}
        </Section>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.niebla },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  image: { width: '100%', height: 180, backgroundColor: COLORS.linea },
  title: { ...TYPOGRAPHY.display, fontSize: 26, color: COLORS.ink },
  meta: { ...TYPOGRAPHY.label, color: COLORS.agua },
  summary: { ...TYPOGRAPHY.body, color: COLORS.pizarra },
  money: { ...TYPOGRAPHY.label, color: COLORS.cauce },
  section: { gap: SPACING.sm, marginTop: SPACING.md },
  sectionTitle: { ...TYPOGRAPHY.title, color: COLORS.cauce },
  input: {
    backgroundColor: COLORS.papel,
    borderWidth: 1,
    borderColor: COLORS.linea,
    borderRadius: RADIUS.card,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    fontSize: 15,
    color: COLORS.ink,
  },
  error: { ...TYPOGRAPHY.label, color: COLORS.coral },
  button: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.cauce,
  },
  buttonPressed: { opacity: 0.7 },
  buttonText: { ...TYPOGRAPHY.label, color: COLORS.papel },
  donationItem: { gap: SPACING.xs },
  remove: { alignSelf: 'flex-end', paddingVertical: SPACING.xs, paddingHorizontal: SPACING.sm },
  removeText: { ...TYPOGRAPHY.label, color: COLORS.coral },

    editButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.cauce,
  },
  editText: { ...TYPOGRAPHY.label, color: COLORS.cauce },
});