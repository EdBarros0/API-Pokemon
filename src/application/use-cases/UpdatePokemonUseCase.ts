import type { Pokemon } from "../../domain/entities/Pokemon";
import { ResourceNotFoundError } from "../../domain/errors/ResourceNotFoundError";
import type { IPokemonRepository } from "../../domain/repositories/IPokemonRepository";

export class UpdatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(pokemon: Pokemon): Promise<void> {
    const existingPokemon = await this.pokemonRepository.findById(pokemon.id);

    if (!existingPokemon) {
      throw new ResourceNotFoundError();
    }

    await this.pokemonRepository.update(pokemon);
  }
}