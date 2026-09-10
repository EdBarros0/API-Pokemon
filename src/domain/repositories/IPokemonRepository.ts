import type { Pokemon } from '@domain/entities/Pokemon';

export interface IPokemonRepository {
  findAll(type?: string): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | null>;
  create(pokemon: Pokemon): Promise<void>;
  update(pokemon: Pokemon): Promise<void>;
  delete(id: string): Promise<void>;
}
