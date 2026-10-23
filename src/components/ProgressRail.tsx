import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, RADIUS } from '@/theme';

interface ProgressRailProps {
  percent: number;
  color: string;
}

// El ancho del relleno se resuelve con flex (sin position absolute ni estilos inline).
export function ProgressRail({ percent, color }: ProgressRailProps) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        rail: { flexDirection: 'row', height: 6, borderRadius: RADIUS.rail, backgroundColor: COLORS.linea, overflow: 'hidden' },
        fill: { flex: Math.max(percent, 0.0001), backgroundColor: color },
        rest: { flex: Math.max(100 - percent, 0.0001) },
      }),
    [percent, color],
  );

  return (
    <View style={styles.rail}>
      <View style={styles.fill} />
      <View style={styles.rest} />
    </View>
  );
}