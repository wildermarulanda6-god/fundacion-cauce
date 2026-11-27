import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

export const CACHE_MAX_AGE = 1000 * 60 * 60 * 24;

export const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'cauce-query-cache',
});