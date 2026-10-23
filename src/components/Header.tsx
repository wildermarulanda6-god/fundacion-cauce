import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export function Header() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.kicker}>Bogotá y Cundinamarca</Text>
      <Text style={styles.name}>Fundación Cauce</Text>
      <Text style={styles.tagline}>Cada aporte abre camino.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.cauce,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxl + SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  kicker: { ...TYPOGRAPHY.label, color: COLORS.agua, marginBottom: SPACING.xs },
  name: { ...TYPOGRAPHY.display, color: COLORS.papel },
  tagline: { ...TYPOGRAPHY.body, color: COLORS.niebla, marginTop: SPACING.xs },
});