import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

interface ListRowProps {
  title: string;
  subtitle: string;
  trailing?: string;
}

export function ListRow({ title, subtitle, trailing }: ListRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {trailing ? <Text style={styles.trailing}>{trailing}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.papel,
    borderWidth: 1,
    borderColor: COLORS.linea,
    borderRadius: RADIUS.card,
  },
  main: { flex: 1, gap: SPACING.xs },
  title: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.ink },
  subtitle: { ...TYPOGRAPHY.label, color: COLORS.pizarra },
  trailing: { ...TYPOGRAPHY.label, color: COLORS.cauce },
});