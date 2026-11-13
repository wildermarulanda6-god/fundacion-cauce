import { z } from 'zod';

export const projectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(60, 'El título no puede pasar de 60 caracteres'),
  location: z.string().trim().min(3, 'Escribe el lugar (mínimo 3 caracteres)'),
  summary: z
    .string()
    .trim()
    .min(10, 'El resumen debe tener al menos 10 caracteres')
    .max(160, 'El resumen no puede pasar de 160 caracteres'),
  goalAmount: z
    .string()
    .trim()
    .regex(/^\d+$/, 'Escribe solo números, sin puntos ni comas')
    .refine((value) => Number(value) >= 100000, 'La meta mínima es $100.000'),
  status: z.enum(['active', 'paused', 'completed']),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;