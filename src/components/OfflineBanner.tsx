import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export function OfflineBanner() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Sin conexión: mostrando los últimos datos guardados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: COLORS.sol, padding: SPACING.sm },
  text: { ...TYPOGRAPHY.label, color: COLORS.ink, textAlign: 'center' },
});