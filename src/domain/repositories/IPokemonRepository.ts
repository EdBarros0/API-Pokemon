import type { Pokemon } from '@domain/entities/Pokemon';

export interface IPokemonRepository {
  findAll(filters: { type?: string; minLevel: number; maxLevel: number }): Promise<Pokemon[]>;
  searchByName(term: string): Promise<Pokemon[]>;
  count(): Promise<number>;
  findById(id: string): Promise<Pokemon | null>;
  create(pokemon: Pokemon): Promise<Pokemon>;
  update(pokemon: Pokemon): Promise<void>;
  updateLevel(id: string, newLevel: number): Promise<void>;
  delete(id: string): Promise<void>;
}
