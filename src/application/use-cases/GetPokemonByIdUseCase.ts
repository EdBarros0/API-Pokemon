import type { Pokemon } from '@domain/entities/Pokemon';
import { ResourceNotFoundError } from '@domain/errors/ResourceNotFoundError';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class GetPokemonByIdUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new ResourceNotFoundError();
    }

    return pokemon;
  }
}
