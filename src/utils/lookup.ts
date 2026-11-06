import { projects } from '@/data/mockData';

const titles = new Map<string, string>(
  projects.map((project): [string, string] => [project.id, project.title]),
);

export function getProjectTitle(projectId: string): string {
  return titles.get(projectId) ?? 'Proyecto desconocido';
}