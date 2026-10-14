import { z } from 'zod';

export const getPokemonByIdSchema = z.object({
  idOrName: z
    .string({ error: 'O ID ou nome do Pokémon é obrigatório' })
    .trim()
    .min(1, 'O ID ou nome do Pokémon é obrigatório')
    .transform((value) => value.toLowerCase())
    .refine((value) => /^[a-z0-9-]+$/.test(value), {
      message: 'Informe um ID ou nome válido de Pokémon',
    }),
});

export type GetPokemonByIdParams = z.infer<typeof getPokemonByIdSchema>;
