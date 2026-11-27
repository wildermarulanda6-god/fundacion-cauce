import { z } from 'zod';

export const donorProfileSchema = z.object({
  name: z.string().trim().min(3, 'Escribe tu nombre (mínimo 3 caracteres)'),
  email: z.string().trim().email('Escribe un correo válido'),
  document: z.string().trim().regex(/^\d{6,10}$/, 'El documento debe tener entre 6 y 10 números'),
});

export type DonorProfile = z.infer<typeof donorProfileSchema>;

export const EMPTY_PROFILE: DonorProfile = { name: '', email: '', document: '' };