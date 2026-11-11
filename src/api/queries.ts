import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Donation, NewDonation, Project } from '@/types';
import { apiClient } from './client';

export const queryKeys = {
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
  donations: (projectId: string) => ['projects', projectId, 'donations'] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: async () => (await apiClient.get<Project[]>('/projects')).data,
  });
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: queryKeys.project(projectId),
    queryFn: async () => (await apiClient.get<Project>(`/projects/${projectId}`)).data,
  });
}

export function useDonations(projectId: string) {
  return useQuery({
    queryKey: queryKeys.donations(projectId),
    queryFn: async () => (await apiClient.get<Donation[]>(`/projects/${projectId}/donations`)).data,
  });
}

export function useCreateDonation(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (donation: NewDonation) =>
      (await apiClient.post<Donation>(`/projects/${projectId}/donations`, donation)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
  });
}

export function useDeleteDonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (donationId: string) => (await apiClient.delete<Donation>(`/donations/${donationId}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
  });
}