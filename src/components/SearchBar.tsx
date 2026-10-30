import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, onChangeText, onClear }: SearchBarProps) {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Busca por proyecto, lugar o tema"
        placeholderTextColor={COLORS.pizarra}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Buscar proyectos"
      />
      {value.length > 0 && (
        <Pressable
          onPress={onClear}
          style={({ pressed }) => [styles.clear, pressed && styles.clearPressed]}
          accessibilityRole="button"
          accessibilityLabel="Limpiar búsqueda"
        >
          <Text style={styles.clearText}>Borrar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.papel,
    borderWidth: 1,
    borderColor: COLORS.linea,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    fontSize: 15,
    color: COLORS.ink,
  },
  clear: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.badge,
    backgroundColor: COLORS.niebla,
  },
  clearPressed: { opacity: 0.6 },
  clearText: { ...TYPOGRAPHY.label, color: COLORS.cauce },
});