import { AxiosError } from 'axios';
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { projects as seedProjects } from '@/data/mockData';
import type { Donation, NewDonation, Project, ProjectInput } from '@/types';
import { normalizeText } from '@/utils/search';

const LATENCY_MS = 700;
const MAX_DONATION = 10000000;

let projectsDb: Project[] = seedProjects.map((project) => ({ ...project }));
let donationsDb: Donation[] = [];
let nextId = 1;
let nextProjectNumber = seedProjects.length + 1;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function respond<T>(config: InternalAxiosRequestConfig, status: number, data: T): AxiosResponse<T> {
  return { data, status, statusText: String(status), headers: {}, config };
}

function fail(config: InternalAxiosRequestConfig, status: number, message: string): never {
  throw new AxiosError(message, String(status), config, undefined, respond(config, status, { message }));
}

function adjustRaised(projectId: string, delta: number): void {
  projectsDb = projectsDb.map((item) =>
    item.id === projectId ? { ...item, raisedAmount: item.raisedAmount + delta } : item,
  );
}

export const mockAdapter: AxiosAdapter = async (config) => {
  await wait(LATENCY_MS);
  const method = (config.method ?? 'get').toLowerCase();
  const url = config.url ?? '';

  if (method === 'get' && url === '/projects') {
    return respond(config, 200, projectsDb);
  }

    if (method === 'post' && url === '/projects') {
    const body = JSON.parse(String(config.data)) as ProjectInput;
    if (projectsDb.some((item) => normalizeText(item.title) === normalizeText(body.title))) {
      return fail(config, 422, 'Ya existe un proyecto con ese título');
    }
    const id = `p${nextProjectNumber++}`;
    const project: Project = {
      ...body,
      id,
      raisedAmount: 0,
      imageUrl: `https://picsum.photos/seed/cauce-${id}/800/400`,
      donorIds: [],
      beneficiaryIds: [],
      reportIds: [],
    };
    projectsDb = [project, ...projectsDb];
    return respond(config, 201, project);
  }

  const projectMatch = /^\/projects\/([^/]+)$/.exec(url);
  if (method === 'get' && projectMatch) {
    const project = projectsDb.find((item) => item.id === projectMatch[1]);
    return project ? respond(config, 200, project) : fail(config, 404, 'Proyecto no encontrado');
  }

    if (method === 'put' && projectMatch) {
    const projectId = projectMatch[1] ?? '';
    const current = projectsDb.find((item) => item.id === projectId);
    if (!current) {
      return fail(config, 404, 'Proyecto no encontrado');
    }
    const body = JSON.parse(String(config.data)) as ProjectInput;
    if (projectsDb.some((item) => item.id !== projectId && normalizeText(item.title) === normalizeText(body.title))) {
      return fail(config, 422, 'Ya existe un proyecto con ese título');
    }
    if (body.goalAmount < current.raisedAmount) {
      return fail(config, 422, 'La meta no puede ser menor a lo ya recaudado');
    }
    const updated: Project = { ...current, ...body };
    projectsDb = projectsDb.map((item) => (item.id === projectId ? updated : item));
    return respond(config, 200, updated);
  }

  const donationsMatch = /^\/projects\/([^/]+)\/donations$/.exec(url);
  if (method === 'get' && donationsMatch) {
    return respond(config, 200, donationsDb.filter((item) => item.projectId === donationsMatch[1]));
  }

  if (method === 'post' && donationsMatch) {
    const projectId = donationsMatch[1] ?? '';
    const body = JSON.parse(String(config.data)) as NewDonation;
    if (!projectsDb.some((item) => item.id === projectId)) {
      return fail(config, 404, 'Proyecto no encontrado');
    }
    if (body.donorName.trim() === '' || !(body.amount > 0)) {
      return fail(config, 422, 'Escribe tu nombre y un monto mayor a cero');
    }
    if (body.amount > MAX_DONATION) {
      return fail(config, 422, 'El monto máximo por donación es $10.000.000');
    }
    const donation: Donation = {
      id: `n${nextId++}`,
      projectId,
      donorName: body.donorName.trim(),
      amount: body.amount,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    donationsDb = [donation, ...donationsDb];
    adjustRaised(projectId, donation.amount);
    return respond(config, 201, donation);
  }

  const deleteMatch = /^\/donations\/([^/]+)$/.exec(url);
  if (method === 'delete' && deleteMatch) {
    const donation = donationsDb.find((item) => item.id === deleteMatch[1]);
    if (!donation) {
      return fail(config, 404, 'Donación no encontrada');
    }
    donationsDb = donationsDb.filter((item) => item.id !== donation.id);
    adjustRaised(donation.projectId, -donation.amount);
    return respond(config, 200, donation);
  }

  return fail(config, 404, `Ruta no encontrada: ${method.toUpperCase()} ${url}`);
};