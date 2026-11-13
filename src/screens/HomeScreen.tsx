import { useCallback, useMemo } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProjects } from '@/api/queries';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { Header } from '@/components/Header';
import { LoadingState } from '@/components/LoadingState';
import { ProjectCard } from '@/components/ProjectCard';
import { SearchBar } from '@/components/SearchBar';
import { StatusFilterBar } from '@/components/StatusFilterBar';
import { SummaryStrip } from '@/components/SummaryStrip';
import type { SummaryItem } from '@/components/SummaryStrip';
import { beneficiaries, donors, reports } from '@/data/mockData';
import type { RootStackParamList } from '@/navigation/types';
import { useAppStore } from '@/store/useAppStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Project } from '@/types';
import { normalizeText } from '@/utils/search';

const NO_PROJECTS: Project[] = [];

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isPending, isError, error, refetch, isRefetching } = useProjects();
  const projects = data ?? NO_PROJECTS;

  const query = useAppStore((state) => state.query);
  const status = useAppStore((state) => state.status);
  const favoriteIds = useAppStore((state) => state.favoriteIds);
  const setQuery = useAppStore((state) => state.setQuery);
  const setStatus = useAppStore((state) => state.setStatus);
  const resetFilters = useAppStore((state) => state.resetFilters);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  const summary = useMemo<SummaryItem[]>(
    () => [
      { label: 'Donantes', value: donors.length },
      { label: 'Proyectos', value: projects.length },
      { label: 'Beneficiarios', value: beneficiaries.length },
      { label: 'Informes', value: reports.length },
    ],
    [projects.length],
  );

  const filteredProjects = useMemo(() => {
    const needle = normalizeText(query.trim());
    return projects.filter((project) => {
      const matchesStatus = status === 'all' || project.status === status;
      const haystack = normalizeText(`${project.title} ${project.location} ${project.summary}`);
      return matchesStatus && (needle === '' || haystack.includes(needle));
    });
  }, [projects, query, status]);

  const handlePress = useCallback(
    (project: Project) => navigation.navigate('ProjectDetail', { projectId: project.id }),
    [navigation],
  );

  const handleClear = useCallback(() => setQuery(''), [setQuery]);
  const handleNew = useCallback(() => navigation.navigate('ProjectForm'), [navigation]);

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const keyExtractor = useCallback((item: Project) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Project>) => (
      <View style={styles.cardWrap}>
        <ProjectCard
          project={item}
          isFavorite={favoriteIds.includes(item.id)}
          onPress={handlePress}
          onToggleFavorite={toggleFavorite}
        />
      </View>
    ),
    [handlePress, favoriteIds, toggleFavorite],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  const renderEmpty = useCallback(
    () => <EmptyState query={query.trim()} onReset={resetFilters} />,
    [query, resetFilters],
  );

  const listHeader = (
    <View style={styles.listHeader}>
      <SummaryStrip items={summary} />
      <Text style={styles.count}>{`${filteredProjects.length} de ${projects.length} proyectos`}</Text>
    </View>
  );

  let content;
  if (isPending) {
    content = <LoadingState />;
  } else if (isError) {
    content = <ErrorState message={error.message} onRetry={handleRefresh} />;
  } else {
    content = (
      <FlatList
        data={filteredProjects}
        extraData={favoriteIds}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshing={isRefetching}
        onRefresh={handleRefresh}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header />
      <View style={styles.controls}>
        <SearchBar value={query} onChangeText={setQuery} onClear={handleClear} />
        <StatusFilterBar selected={status} onSelect={setStatus} />
        <Pressable
          onPress={handleNew}
          style={({ pressed }) => [styles.newButton, pressed && styles.newButtonPressed]}
          accessibilityRole="button"
        >
          <Text style={styles.newButtonText}>+ Nuevo proyecto</Text>
        </Pressable>
      </View>
      {content}
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
   newButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.cauce,
  },
  newButtonPressed: { opacity: 0.85 },
  newButtonText: { ...TYPOGRAPHY.label, color: COLORS.papel },
});