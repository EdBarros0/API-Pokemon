import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  private pokemons: Pokemon[] = [];

  async findAll(filters: { type?: string; minLevel: number; maxLevel: number }): Promise<Pokemon[]> {
    return this.pokemons.filter((pokemon) =>
      (!filters.type || pokemon.type.toLowerCase() === filters.type.toLowerCase()) &&
      pokemon.level >= filters.minLevel && pokemon.level <= filters.maxLevel,
    );
  }

  async searchByName(term: string): Promise<Pokemon[]> {
    const normalizedTerm = term.toLowerCase();
    return this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(normalizedTerm),
    );
  }

  async count(): Promise<number> {
    return this.pokemons.length;
  }

  async findById(id: string): Promise<Pokemon | null> {
    return this.pokemons.find((pokemon) => pokemon.id === id) ?? null;
  }

  async create(pokemon: Pokemon): Promise<Pokemon> {
    this.pokemons.push(pokemon);
    return pokemon;
  }

  async update(pokemon: Pokemon): Promise<void> {
    const index = this.pokemons.findIndex(
      (storedPokemon) => storedPokemon.id === pokemon.id,
    );

    if (index >= 0) {
      this.pokemons[index] = pokemon;
    }
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    const pokemon = this.pokemons.find((storedPokemon) => storedPokemon.id === id);

    if (pokemon) {
      pokemon.level = newLevel;
    }
  }

  async delete(id: string): Promise<void> {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
  }
}
