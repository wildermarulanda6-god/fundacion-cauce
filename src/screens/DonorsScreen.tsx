import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { ListRow } from '@/components/ListRow';
import { donors } from '@/data/mockData';
import { COLORS, SPACING } from '@/theme';
import type { Donor } from '@/types';
import { formatCop } from '@/utils/format';
import { DONOR_KIND_LABEL } from '@/utils/labels';

export function DonorsScreen() {
  const keyExtractor = useCallback((item: Donor) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Donor>) => (
      <ListRow
        title={item.name}
        subtitle={`${DONOR_KIND_LABEL[item.kind]} · última donación ${item.lastDonationAt}`}
        trailing={formatCop(item.totalDonated)}
      />
    ),
    [],
  );

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

  return (
    <FlatList
      data={donors}
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