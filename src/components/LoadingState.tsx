import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export function LoadingState() {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={COLORS.cauce} />
      <Text style={styles.text}>Cargando…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xxl, gap: SPACING.md },
  text: { ...TYPOGRAPHY.label, color: COLORS.pizarra },
});