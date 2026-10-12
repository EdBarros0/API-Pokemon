import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class CountPokemonsUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  execute(): Promise<number> {
    return this.pokemonRepository.count();
  }
}
