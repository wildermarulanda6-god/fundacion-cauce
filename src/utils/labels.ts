import type { AttentionState, DonorKind } from '@/types';

export const DONOR_KIND_LABEL: Record<DonorKind, string> = {
  person: 'Persona',
  company: 'Empresa',
};

export const ATTENTION_LABEL: Record<AttentionState, string> = {
  enrolled: 'Inscrito',
  in_progress: 'En proceso',
  graduated: 'Graduado',
};