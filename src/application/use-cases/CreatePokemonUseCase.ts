import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import type { CreatePokemonDTO } from '@application/dtos/CreatePokemonDTO';
import { AppError } from '@domain/errors/app.error';

export class CreatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(input: CreatePokemonDTO): Promise<Pokemon> {
    const existingPokemon = await this.pokemonRepository.findById(input.id);
    if (existingPokemon) {
      throw new AppError('Já existe um Pokémon cadastrado com este ID.', 409);
    }

    const pokemon: Pokemon = {
      id: input.id,
      name: input.name,
      type: input.type,
      hp: input.hp,
      attack: input.attack,
      defense: input.defense,
      level: input.level,
      trainerId: input.trainerId ?? null,
    };

    return this.pokemonRepository.create(pokemon);
  }
}
