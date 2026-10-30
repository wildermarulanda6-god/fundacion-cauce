import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING, STATUS_LABEL, TYPOGRAPHY } from '@/theme';
import type { StatusFilter } from '@/types';

interface FilterOption {
  value: StatusFilter;
  label: string;
}

const OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: STATUS_LABEL.active },
  { value: 'paused', label: STATUS_LABEL.paused },
  { value: 'completed', label: STATUS_LABEL.completed },
];

interface StatusFilterBarProps {
  selected: StatusFilter;
  onSelect: (value: StatusFilter) => void;
}

export function StatusFilterBar({ selected, onSelect }: StatusFilterBarProps) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => {
        const isSelected = option.value === selected;
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={[styles.chip, isSelected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={isSelected ? styles.labelSelected : styles.label}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.badge,
    borderWidth: 1,
    borderColor: COLORS.linea,
    backgroundColor: COLORS.papel,
  },
  chipSelected: { backgroundColor: COLORS.cauce, borderColor: COLORS.cauce },
  label: { ...TYPOGRAPHY.label, color: COLORS.cauce },
  labelSelected: { ...TYPOGRAPHY.label, color: COLORS.papel },
});