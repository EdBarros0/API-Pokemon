import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class SearchPokemonsByNameUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  execute(term: string): Promise<Pokemon[]> {
    return this.pokemonRepository.searchByName(term);
  }
}
