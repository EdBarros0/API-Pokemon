import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { AppError } from '@domain/errors/app.error';

export class DeletePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado.', 404);
    }

    await this.pokemonRepository.delete(id);
  }
}
