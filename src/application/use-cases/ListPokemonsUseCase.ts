import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class ListPokemonsUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(filters: { type?: string; minLevel: number; maxLevel: number }): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll(filters);
  }
}
