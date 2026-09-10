import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  private pokemons: Pokemon[] = [];

  async findAll(type?: string): Promise<Pokemon[]> {
    if (!type) {
      return this.pokemons;
    }

    return this.pokemons.filter(
      (pokemon) => pokemon.type.toLowerCase() === type.toLowerCase(),
    );
  }

  async findById(id: string): Promise<Pokemon | null> {
    return this.pokemons.find((pokemon) => pokemon.id === id) ?? null;
  }

  async create(pokemon: Pokemon): Promise<void> {
    this.pokemons.push(pokemon);
  }

  async update(pokemon: Pokemon): Promise<void> {
    const index = this.pokemons.findIndex(
      (storedPokemon) => storedPokemon.id === pokemon.id,
    );

    if (index >= 0) {
      this.pokemons[index] = pokemon;
    }
  }

  async delete(id: string): Promise<void> {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
  }
}
