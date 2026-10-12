import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { AppError } from '@domain/errors/app.error';

export class CreatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(pokemon: Pokemon): Promise<void> {
    const existingPokemon = await this.pokemonRepository.findById(pokemon.id);

    if (existingPokemon) {
      throw new AppError('Já existe um Pokémon cadastrado com este ID.', 409);
    }

    await this.pokemonRepository.create(pokemon);
  }
}
