import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressRail } from '@/components/ProgressRail';
import { COLORS, RADIUS, SPACING, STATUS_COLOR, STATUS_LABEL, TYPOGRAPHY } from '@/theme';
import type { Project } from '@/types';
import { formatCop, percentOf } from '@/utils/format';

interface ProjectCardProps {
  project: Project;
  onPress: (project: Project) => void;
}

export function ProjectCard({ project, onPress }: ProjectCardProps) {
  const percent = percentOf(project.raisedAmount, project.goalAmount);
  const statusColor = STATUS_COLOR[project.status];

  return (
    <Pressable
      onPress={() => onPress(project)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Proyecto ${project.title}, ${percent} por ciento de la meta`}
    >
      <View style={styles.row}>
        <View style={stripeStyles[project.status]} />
        <View style={styles.body}>
          <Image source={{ uri: project.imageUrl }} style={styles.image} />
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{project.title}</Text>
              <Text style={styles.status}>{STATUS_LABEL[project.status]}</Text>
            </View>
            <Text style={styles.location}>{project.location}</Text>
            <Text style={styles.summary}>{project.summary}</Text>

            <ProgressRail percent={percent} color={statusColor} />
            <View style={styles.moneyRow}>
              <Text style={styles.raised}>{formatCop(project.raisedAmount)}</Text>
              <Text style={styles.goal}>{`de ${formatCop(project.goalAmount)} (${percent}%)`}</Text>
            </View>

            <View style={styles.counts}>
              <Text style={styles.count}>{`${project.donorIds.length} donantes`}</Text>
              <Text style={styles.count}>{`${project.beneficiaryIds.length} beneficiarios`}</Text>
              <Text style={styles.count}>{`${project.reportIds.length} informes`}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// La franja lateral codifica el estado del proyecto: un estilo por estado, sin estilos inline.
const stripeStyles = StyleSheet.create({
  active: { width: 6, backgroundColor: STATUS_COLOR.active },
  paused: { width: 6, backgroundColor: STATUS_COLOR.paused },
  completed: { width: 6, backgroundColor: STATUS_COLOR.completed },
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.papel,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.linea,
    overflow: 'hidden',
  },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  row: { flexDirection: 'row' },
  body: { flex: 1 },
  image: { width: '100%', height: 120, backgroundColor: COLORS.niebla },
  content: { padding: SPACING.lg, gap: SPACING.sm },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: SPACING.md },
  title: { ...TYPOGRAPHY.title, color: COLORS.ink, flex: 1 },
  status: { ...TYPOGRAPHY.label, color: COLORS.pizarra },
  location: { ...TYPOGRAPHY.label, color: COLORS.agua },
  summary: { ...TYPOGRAPHY.body, color: COLORS.pizarra },
  moneyRow: { flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm },
  raised: { ...TYPOGRAPHY.title, color: COLORS.cauce },
  goal: { ...TYPOGRAPHY.label, color: COLORS.pizarra },
  counts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.niebla,
    paddingTop: SPACING.sm,
  },
  count: { ...TYPOGRAPHY.label, color: COLORS.cauce },
});