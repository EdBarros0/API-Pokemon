import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { AppError } from '@domain/errors/app.error';
import type { UpdatePokemonDTO } from '@application/dtos/UpdatePokemonDTO';

export class UpdatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string, data: UpdatePokemonDTO): Promise<Pokemon> {
    const existingPokemon = await this.pokemonRepository.findById(id);

    if (!existingPokemon) {
      throw new AppError('Pokémon não encontrado.', 404);
    }

    const pokemon: Pokemon = {
      ...existingPokemon,
      ...data,
      id,
      trainerId: data.trainerId ?? existingPokemon.trainerId,
    };
    await this.pokemonRepository.update(pokemon);
    return pokemon;
  }
}
