import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { ListRow } from '@/components/ListRow';
import { reports } from '@/data/mockData';
import { COLORS, SPACING } from '@/theme';
import type { Report } from '@/types';
import { getProjectTitle } from '@/utils/lookup';

export function ReportsScreen() {
  const keyExtractor = useCallback((item: Report) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Report>) => (
      <ListRow
        title={item.title}
        subtitle={getProjectTitle(item.projectId)}
        trailing={item.publishedAt}
      />
    ),
    [],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  return (
    <FlatList
      data={reports}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: COLORS.niebla },
  content: { padding: SPACING.lg },
  separator: { height: SPACING.md },
});