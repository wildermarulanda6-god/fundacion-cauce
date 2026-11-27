import { QueryClient } from '@tanstack/react-query';
import { CACHE_MAX_AGE } from './persister';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30000, gcTime: CACHE_MAX_AGE, retry: 1 } },
});