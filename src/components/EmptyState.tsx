import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

interface EmptyStateProps {
  query: string;
  onReset: () => void;
}

export function EmptyState({ query, onReset }: EmptyStateProps) {
  const title = query ? `Ningún proyecto coincide con "${query}"` : 'No hay proyectos en este estado';

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>Prueba con otra palabra o cambia el filtro de estado.</Text>
      <Pressable
        onPress={onReset}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Ver todos los proyectos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: SPACING.xxl, gap: SPACING.md },
  title: { ...TYPOGRAPHY.title, color: COLORS.ink, textAlign: 'center' },
  body: { ...TYPOGRAPHY.body, color: COLORS.pizarra, textAlign: 'center' },
  button: {
    marginTop: SPACING.sm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.cauce,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { ...TYPOGRAPHY.label, color: COLORS.papel },
});