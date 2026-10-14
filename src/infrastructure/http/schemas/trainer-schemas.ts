import { z } from 'zod';

const trainerFields = {
  name: z
    .string({ error: 'O nome é obrigatório' })
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z
    .string({ error: 'O e-mail é obrigatório' })
    .trim()
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  city: z
    .string({ error: 'A cidade é obrigatória' })
    .trim()
    .min(2, 'A cidade é obrigatória'),
};

export const createTrainerSchema = z.object(trainerFields);

// A atualização segue o UpdateTrainerDTO e exige os três campos.
export const updateTrainerSchema = z.object(trainerFields);

export const getTrainerByIdSchema = z.object({
  id: z.string().uuid('O ID do treinador deve ser um UUID válido'),
});

export const searchTrainersQuerySchema = z.object({
  name: z
    .string({ error: 'Informe o nome para pesquisar.' })
    .trim()
    .min(1, 'Informe o nome para pesquisar.'),
});

export type CreateTrainerDTO = z.infer<typeof createTrainerSchema>;
export type UpdateTrainerDTO = z.infer<typeof updateTrainerSchema>;
export type GetTrainerByIdParams = z.infer<typeof getTrainerByIdSchema>;
export type SearchTrainersQuery = z.infer<typeof searchTrainersQuerySchema>;
