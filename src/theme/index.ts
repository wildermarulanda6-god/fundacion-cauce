import type { ProjectStatus } from '@/types';

export const COLORS = {
  ink: '#0B1F24',
  cauce: '#0F4C5C',
  agua: '#4E9F9A',
  niebla: '#EAF0EF',
  papel: '#FBFCFB',
  sol: '#F0A202',
  coral: '#D8553A',
  pizarra: '#5B6B70',
  linea: '#C9D6D4',
} as const;

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const RADIUS = { card: 6, badge: 999, rail: 3 } as const;

export const TYPOGRAPHY = {
  display: { fontSize: 36, fontWeight: '800', letterSpacing: -1 },
  title: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 0.2 },
  figure: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
} as const;

export const STATUS_COLOR: Record<ProjectStatus, string> = {
  active: COLORS.agua,
  paused: COLORS.sol,
  completed: COLORS.pizarra,
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'En marcha',
  paused: 'En pausa',
  completed: 'Terminado',
};