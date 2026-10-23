import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/ProjectCard';
import { SummaryStrip } from '@/components/SummaryStrip';
import type { SummaryItem } from '@/components/SummaryStrip';
import { beneficiaries, donors, projects, reports } from '@/data/mockData';
import { COLORS, SPACING } from '@/theme';
import type { Project } from '@/types';

const summary: SummaryItem[] = [
  { label: 'Donantes', value: donors.length },
  { label: 'Proyectos', value: projects.length },
  { label: 'Beneficiarios', value: beneficiaries.length },
  { label: 'Informes', value: reports.length },
];

export function HomeScreen() {
  const handlePress = (project: Project) => {
    Alert.alert(project.title, `${project.donorIds.length} donantes apoyan este proyecto.`);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header />
      <SummaryStrip items={summary} />
      <View style={styles.list}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onPress={handlePress} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.niebla },
  content: { paddingBottom: SPACING.xxl },
  list: { padding: SPACING.lg, gap: SPACING.lg },
});