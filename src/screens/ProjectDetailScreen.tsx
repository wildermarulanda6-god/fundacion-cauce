import type { ReactNode } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListRow } from '@/components/ListRow';
import { ProgressRail } from '@/components/ProgressRail';
import { beneficiaries, donors, projects, reports } from '@/data/mockData';
import type { RootStackParamList } from '@/navigation/types';
import { COLORS, SPACING, STATUS_COLOR, STATUS_LABEL, TYPOGRAPHY } from '@/theme';
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

export function ProjectDetailScreen({ route }: ProjectDetailProps) {
  const project = projects.find((item) => item.id === route.params.projectId);

  if (!project) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>No encontramos este proyecto.</Text>
      </View>
    );
  }

  const percent = percentOf(project.raisedAmount, project.goalAmount);
  const projectDonors = donors.filter((item) => project.donorIds.includes(item.id));
  const projectBeneficiaries = beneficiaries.filter((item) => project.beneficiaryIds.includes(item.id));
  const projectReports = reports.filter((item) => project.reportIds.includes(item.id));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image source={{ uri: project.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.meta}>{`${project.location} · ${STATUS_LABEL[project.status]}`}</Text>
      <Text style={styles.summary}>{project.summary}</Text>
      <ProgressRail percent={percent} color={STATUS_COLOR[project.status]} />
      <Text style={styles.money}>
        {`${formatCop(project.raisedAmount)} de ${formatCop(project.goalAmount)} (${percent}%)`}
      </Text>

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
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.niebla },
  missingText: { ...TYPOGRAPHY.body, color: COLORS.pizarra },
});