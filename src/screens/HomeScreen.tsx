import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { EmptyState } from '@/components/EmptyState';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/ProjectCard';
import { SearchBar } from '@/components/SearchBar';
import { StatusFilterBar } from '@/components/StatusFilterBar';
import { SummaryStrip } from '@/components/SummaryStrip';
import type { SummaryItem } from '@/components/SummaryStrip';
import { beneficiaries, donors, projects, reports } from '@/data/mockData';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Project, StatusFilter } from '@/types';
import { normalizeText } from '@/utils/search';

const summary: SummaryItem[] = [
  { label: 'Donantes', value: donors.length },
  { label: 'Proyectos', value: projects.length },
  { label: 'Beneficiarios', value: beneficiaries.length },
  { label: 'Informes', value: reports.length },
];

export function HomeScreen() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const filteredProjects = useMemo(() => {
    const needle = normalizeText(query.trim());
    return projects.filter((project) => {
      const matchesStatus = status === 'all' || project.status === status;
      const haystack = normalizeText(`${project.title} ${project.location} ${project.summary}`);
      return matchesStatus && (needle === '' || haystack.includes(needle));
    });
  }, [query, status]);

  const handlePress = useCallback((project: Project) => {
    Alert.alert(project.title, `${project.donorIds.length} donantes apoyan este proyecto.`);
  }, []);

  const handleClear = useCallback(() => setQuery(''), []);

  const handleReset = useCallback(() => {
    setQuery('');
    setStatus('all');
  }, []);

  const keyExtractor = useCallback((item: Project) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Project>) => (
      <View style={styles.cardWrap}>
        <ProjectCard project={item} onPress={handlePress} />
      </View>
    ),
    [handlePress],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  const renderEmpty = useCallback(
    () => <EmptyState query={query.trim()} onReset={handleReset} />,
    [query, handleReset],
  );

  const listHeader = (
    <View style={styles.listHeader}>
      <SummaryStrip items={summary} />
      <Text style={styles.count}>{`${filteredProjects.length} de ${projects.length} proyectos`}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header />
      <View style={styles.controls}>
        <SearchBar value={query} onChangeText={setQuery} onClear={handleClear} />
        <StatusFilterBar selected={status} onSelect={setStatus} />
      </View>
      <FlatList
        data={filteredProjects}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.niebla },
  controls: {
    padding: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: COLORS.niebla,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.linea,
  },
  listContent: { paddingBottom: SPACING.xxl },
  listHeader: { marginBottom: SPACING.lg },
  count: { ...TYPOGRAPHY.label, color: COLORS.pizarra, paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  cardWrap: { paddingHorizontal: SPACING.lg },
  separator: { height: SPACING.lg },
});