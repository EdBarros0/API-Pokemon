import type { Pokemon } from "../entities/Pokemon";

export interface IPokemonRepository {
  findAll(type?: string): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | null>;
  create(pokemon: Pokemon): Promise<void>;
  update(pokemon: Pokemon): Promise<void>;
  delete(id: string): Promise<void>;
}