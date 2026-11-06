import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { ListRow } from '@/components/ListRow';
import { beneficiaries } from '@/data/mockData';
import { COLORS, SPACING } from '@/theme';
import type { Beneficiary } from '@/types';
import { ATTENTION_LABEL } from '@/utils/labels';
import { getProjectTitle } from '@/utils/lookup';

export function BeneficiariesScreen() {
  const keyExtractor = useCallback((item: Beneficiary) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Beneficiary>) => (
      <ListRow
        title={item.name}
        subtitle={`${item.city} · ${getProjectTitle(item.projectId)}`}
        trailing={ATTENTION_LABEL[item.attention]}
      />
    ),
    [],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  return (
    <FlatList
      data={beneficiaries}
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