import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

export interface SummaryItem {
  label: string;
  value: number;
}

interface SummaryStripProps {
  items: SummaryItem[];
}

// Una sola franja con divisores: los 4 conteos de las entidades (donors, projects, beneficiaries, reports).
export function SummaryStrip({ items }: SummaryStripProps) {
  return (
    <View style={styles.strip}>
      {items.map((item, index) => (
        <View key={item.label} style={index === items.length - 1 ? styles.cellLast : styles.cell}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    backgroundColor: COLORS.papel,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.linea,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderRightWidth: 1,
    borderRightColor: COLORS.linea,
  },
  cellLast: { flex: 1, alignItems: 'center', paddingVertical: SPACING.lg },
  value: { ...TYPOGRAPHY.figure, color: COLORS.cauce },
  label: { ...TYPOGRAPHY.label, color: COLORS.pizarra, marginTop: SPACING.xs },
});