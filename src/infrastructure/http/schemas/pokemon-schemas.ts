import { z } from 'zod';

const pokemonTypeSchema = z
  .string({ error: 'O tipo do Pokémon é obrigatório' })
  .trim()
  .min(1, 'O tipo do Pokémon é obrigatório');

const pokemonFields = {
  name: z
    .string({ error: 'O nome é obrigatório' })
    .trim()
    .min(2, 'O nome é obrigatório'),
  type: pokemonTypeSchema,
  hp: z
    .number({ error: 'HP deve ser um número inteiro' })
    .int('HP deve ser um número inteiro')
    .nonnegative('HP não pode ser negativo'),
  attack: z
    .number({ error: 'Ataque deve ser um número inteiro' })
    .int('Ataque deve ser um número inteiro')
    .nonnegative('Ataque não pode ser negativo'),
  defense: z
    .number({ error: 'Defesa deve ser um número inteiro' })
    .int('Defesa deve ser um número inteiro')
    .nonnegative('Defesa não pode ser negativo'),
};

export const createPokemonSchema = z.object({
  name: z
    .string({ error: 'O nome é obrigatório' })
    .trim()
    .min(2, 'O nome deve ter no mínimo 2 caracteres'),
  level: z.number().int().min(1).max(100).optional(),
  trainerId: z.string().uuid('trainerId deve ser um UUID válido').optional(),
});

export const updatePokemonSchema = z.object({
  name: pokemonFields.name,
  type: pokemonFields.type,
  hp: pokemonFields.hp,
  attack: pokemonFields.attack,
  defense: pokemonFields.defense,
  level: z.number().int().min(1).max(100),
  trainerId: z.string().uuid('trainerId deve ser um UUID válido').optional(),
});

export const updatePokemonLevelSchema = z.object({
  newLevel: z
    .number({ error: 'O nível deve ser um número inteiro' })
    .int('O nível deve ser um número inteiro')
    .positive('O nível deve ser maior que zero')
    .min(1)
    .max(100),
});

export const pokemonIdParamsSchema = z.object({
  id: z.string().trim().min(1, 'O ID do Pokémon é obrigatório'),
});

export const listPokemonsQuerySchema = z
  .object({
    type: z.string().optional(),
    minLevel: z
      .string()
      .optional()
      .transform((value) => (value === undefined ? 1 : Number(value)))
      .pipe(z.number().int().min(1).max(100)),
    maxLevel: z
      .string()
      .optional()
      .transform((value) => (value === undefined ? 100 : Number(value)))
      .pipe(z.number().int().min(1).max(100)),
  })
  .refine((query) => query.minLevel <= query.maxLevel, {
    message: 'minLevel não pode ser maior que maxLevel',
    path: ['minLevel'],
  });

export const searchPokemonsQuerySchema = z.object({
  name: z
    .string({ error: 'Informe o parâmetro name.' })
    .trim()
    .min(1, 'Informe o parâmetro name.'),
});

export type CreatePokemonInput = z.infer<typeof createPokemonSchema>;
export type UpdatePokemonInput = z.infer<typeof updatePokemonSchema>;
export type UpdatePokemonLevelInput = z.infer<typeof updatePokemonLevelSchema>;
