import type { Beneficiary, Donor, Project, Report } from '@/types';

export const donors: Donor[] = [
  { id: 'd1', name: 'Marta Quintero', kind: 'person', totalDonated: 1200000, lastDonationAt: '2026-09-28' },
  { id: 'd2', name: 'Ferretería El Puente', kind: 'company', totalDonated: 4500000, lastDonationAt: '2026-10-02' },
  { id: 'd3', name: 'Julián Barrera', kind: 'person', totalDonated: 300000, lastDonationAt: '2026-10-10' },
  { id: 'd4', name: 'Panadería La Espiga', kind: 'company', totalDonated: 2100000, lastDonationAt: '2026-08-19' },
  { id: 'd5', name: 'Camila Ortiz', kind: 'person', totalDonated: 800000, lastDonationAt: '2026-10-15' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Agua limpia para Cazucá',
    summary: 'Filtros comunitarios y jornadas de cuidado del agua en cuatro barrios.',
    location: 'Soacha, Cundinamarca',
    status: 'active',
    goalAmount: 18000000,
    raisedAmount: 12600000,
    imageUrl: 'https://picsum.photos/seed/cauce-agua/800/400',
    donorIds: ['d1', 'd2', 'd5'],
    beneficiaryIds: ['b1', 'b2', 'b3'],
    reportIds: ['r1', 'r2'],
  },
  {
    id: 'p2',
    title: 'Refuerzo escolar los sábados',
    summary: 'Tutorías de lectura y matemáticas para niños de primaria.',
    location: 'Ciudad Bolívar, Bogotá',
    status: 'active',
    goalAmount: 9000000,
    raisedAmount: 3150000,
    imageUrl: 'https://picsum.photos/seed/cauce-escuela/800/400',
    donorIds: ['d3', 'd4'],
    beneficiaryIds: ['b4', 'b5'],
    reportIds: ['r3'],
  },
  {
    id: 'p3',
    title: 'Huertas en terrazas',
    summary: 'Cultivos urbanos para familias que cuidan a adultos mayores.',
    location: 'Usme, Bogotá',
    status: 'paused',
    goalAmount: 6000000,
    raisedAmount: 2400000,
    imageUrl: 'https://picsum.photos/seed/cauce-huerta/800/400',
    donorIds: ['d4'],
    beneficiaryIds: ['b6'],
    reportIds: ['r4'],
  },
  {
    id: 'p4',
    title: 'Biblioteca rodante',
    summary: 'Una camioneta con 600 libros que recorre veredas cada quince días.',
    location: 'Sumapaz, Bogotá',
    status: 'completed',
    goalAmount: 7500000,
    raisedAmount: 7500000,
    imageUrl: 'https://picsum.photos/seed/cauce-libros/800/400',
    donorIds: ['d1', 'd2', 'd3', 'd4'],
    beneficiaryIds: ['b7', 'b8'],
    reportIds: ['r5', 'r6'],
  },
];

export const beneficiaries: Beneficiary[] = [
  { id: 'b1', name: 'Familia Rojas', projectId: 'p1', city: 'Soacha', attention: 'in_progress' },
  { id: 'b2', name: 'Familia Mendoza', projectId: 'p1', city: 'Soacha', attention: 'enrolled' },
  { id: 'b3', name: 'Hogar Comunitario Sol', projectId: 'p1', city: 'Soacha', attention: 'in_progress' },
  { id: 'b4', name: 'Sara Ríos', projectId: 'p2', city: 'Bogotá', attention: 'in_progress' },
  { id: 'b5', name: 'Tomás Arévalo', projectId: 'p2', city: 'Bogotá', attention: 'enrolled' },
  { id: 'b6', name: 'Familia Salcedo', projectId: 'p3', city: 'Bogotá', attention: 'enrolled' },
  { id: 'b7', name: 'Escuela Vereda Nazareth', projectId: 'p4', city: 'Bogotá', attention: 'graduated' },
  { id: 'b8', name: 'Escuela Vereda Capitolio', projectId: 'p4', city: 'Bogotá', attention: 'graduated' },
];

export const reports: Report[] = [
  { id: 'r1', projectId: 'p1', title: 'Primer trimestre: 40 filtros instalados', publishedAt: '2026-04-05' },
  { id: 'r2', projectId: 'p1', title: 'Segundo trimestre: calidad del agua', publishedAt: '2026-07-06' },
  { id: 'r3', projectId: 'p2', title: 'Avance de lectura en 25 niños', publishedAt: '2026-09-12' },
  { id: 'r4', projectId: 'p3', title: 'Pausa por temporada de lluvias', publishedAt: '2026-08-01' },
  { id: 'r5', projectId: 'p4', title: 'Cierre: 14 veredas visitadas', publishedAt: '2026-06-20' },
  { id: 'r6', projectId: 'p4', title: 'Rendición de cuentas final', publishedAt: '2026-06-30' },
];