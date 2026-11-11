import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProjectCard } from '@/components/ProjectCard';
import { useProjects } from '@/api/queries';
import type { RootStackParamList } from '@/navigation/types';
import { useAppStore } from '@/store/useAppStore';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';
import type { Project } from '@/types';

export function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favoriteIds = useAppStore((state) => state.favoriteIds);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const { data } = useProjects();

  const favorites = useMemo(
    () => (data ?? []).filter((project) => favoriteIds.includes(project.id)),
    [data, favoriteIds],
  );

  const handlePress = useCallback(
    (project: Project) => navigation.navigate('ProjectDetail', { projectId: project.id }),
    [navigation],
  );

  const keyExtractor = useCallback((item: Project) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Project>) => (
      <ProjectCard project={item} isFavorite onPress={handlePress} onToggleFavorite={toggleFavorite} />
    ),
    [handlePress, toggleFavorite],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  const renderEmpty = useCallback(
    () => (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Aún no tienes favoritos</Text>
        <Text style={styles.emptyBody}>Toca "Guardar en favoritos" en cualquier proyecto.</Text>
      </View>
    ),
    [],
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: COLORS.niebla },
  content: { padding: SPACING.lg },
  separator: { height: SPACING.lg },
  empty: { alignItems: 'center', padding: SPACING.xxl, gap: SPACING.sm },
  emptyTitle: { ...TYPOGRAPHY.title, color: COLORS.ink, textAlign: 'center' },
  emptyBody: { ...TYPOGRAPHY.body, color: COLORS.pizarra, textAlign: 'center' },
});