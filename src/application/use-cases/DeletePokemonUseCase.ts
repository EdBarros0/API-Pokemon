import { ResourceNotFoundError } from '@domain/errors/ResourceNotFoundError';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class DeletePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new ResourceNotFoundError();
    }

    await this.pokemonRepository.delete(id);
  }
}
