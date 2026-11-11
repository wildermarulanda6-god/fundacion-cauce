import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Algo salió mal</Text>
      <Text style={styles.body}>{message}</Text>
      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xxl, gap: SPACING.md },
  title: { ...TYPOGRAPHY.title, color: COLORS.coral, textAlign: 'center' },
  body: { ...TYPOGRAPHY.body, color: COLORS.pizarra, textAlign: 'center' },
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.cauce,
  },
  pressed: { opacity: 0.85 },
  buttonText: { ...TYPOGRAPHY.label, color: COLORS.papel },
});