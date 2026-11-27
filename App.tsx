import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StatusBar } from 'expo-status-bar';
import { CACHE_MAX_AGE, queryPersister } from '@/api/persister';
import { setupOnlineManager } from '@/api/online';
import { queryClient } from '@/api/queryClient';
import { RootNavigator } from '@/navigation/RootNavigator';

setupOnlineManager();

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryPersister, maxAge: CACHE_MAX_AGE, buster: 'v1' }}
    >
      <StatusBar style="light" />
      <RootNavigator />
    </PersistQueryClientProvider>
  );
}