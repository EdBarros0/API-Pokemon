import { AppError } from '@domain/errors/app.error';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class UpdatePokemonLevelUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string, newLevel: number): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado.', 404);
    }

    await this.pokemonRepository.updateLevel(id, newLevel);
  }
}
