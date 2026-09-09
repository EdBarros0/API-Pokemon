import type { Pokemon } from '@domain/entities/Pokemon';
import { PokemonAlreadyExistsError } from '@domain/errors/PokemonAlreadyExistsError';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class CreatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(pokemon: Pokemon): Promise<void> {
    const existingPokemon = await this.pokemonRepository.findById(pokemon.id);

    if (existingPokemon) {
      throw new PokemonAlreadyExistsError();
    }

    await this.pokemonRepository.create(pokemon);
  }
}
