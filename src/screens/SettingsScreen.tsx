import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { DonorProfileForm } from '@/components/DonorProfileForm';
import { useDonorProfile } from '@/hooks/useDonorProfile';
import { EMPTY_PROFILE } from '@/schemas/donorProfile';
import { useAppStore } from '@/store/useAppStore';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export function SettingsScreen() {
  const showImages = useAppStore((state) => state.showImages);
  const setShowImages = useAppStore((state) => state.setShowImages);
  const { profile, isLoading, save, clear } = useDonorProfile();

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Mostrar imágenes en las tarjetas</Text>
          <Switch
            value={showImages}
            onValueChange={setShowImages}
            trackColor={{ false: COLORS.linea, true: COLORS.agua }}
            thumbColor={COLORS.papel}
          />
        </View>

        <Text style={styles.sectionTitle}>Mi perfil de donante</Text>
        <Text style={styles.hint}>Se guarda cifrado en este teléfono y rellena tu nombre al donar.</Text>
        {isLoading ? (
          <Text style={styles.hint}>Cargando…</Text>
        ) : (
          <DonorProfileForm defaultValues={profile ?? EMPTY_PROFILE} onSave={save} onClear={clear} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.niebla },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  sectionTitle: { ...TYPOGRAPHY.title, color: COLORS.cauce },
  hint: { ...TYPOGRAPHY.body, color: COLORS.pizarra },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: SPACING.md },
  rowLabel: { ...TYPOGRAPHY.body, color: COLORS.ink, flex: 1 },
});