import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { AppError } from '@domain/errors/app.error';

export class GetPokemonByIdUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado na base de dados.', 404);
    }

    return pokemon;
  }
}
