import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { postgresPool } from './connection';

export class PgPokemonRepository implements IPokemonRepository {
  async findAll(type?: string): Promise<Pokemon[]> {
    const query = type
      ? 'SELECT * FROM pokemons WHERE type = $1'
      : 'SELECT * FROM pokemons';
    const values = type ? [type] : [];

    const result = await postgresPool.query(query, values);
    return result.rows;
  }

  async searchByName(term: string): Promise<Pokemon[]> {
    const result = await postgresPool.query(
      'SELECT * FROM pokemons WHERE name ILIKE $1',
      [`%${term}%`],
    );
    return result.rows;
  }

  async count(): Promise<number> {
    const result = await postgresPool.query(
      'SELECT COUNT(*)::int AS total FROM pokemons',
    );
    return result.rows[0].total;
  }
  
  async findById(id: string): Promise<Pokemon | null> {
    const result = await postgresPool.query(
      'SELECT * FROM pokemons WHERE id = $1',
      [id],
    );
    return result.rows[0] || null;
  }

  async create(pokemon: Pokemon): Promise<void> {
    await postgresPool.query(
      'INSERT INTO pokemons (id, name, type, hp, attack, defense) VALUES ($1, $2, $3, $4, $5, $6)',
      [pokemon.id, pokemon.name, pokemon.type, pokemon.hp, pokemon.attack, pokemon.defense],
    );
  }
  
  async update(pokemon: Pokemon): Promise<void> {
    await postgresPool.query(
      'UPDATE pokemons SET name = $1, type = $2, hp = $3, attack = $4, defense = $5 WHERE id = $6',
      [pokemon.name, pokemon.type, pokemon.hp, pokemon.attack, pokemon.defense, pokemon.id],
    );
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    await postgresPool.query(
      'UPDATE pokemons SET level = $1 WHERE id = $2',
      [newLevel, id],
    );
  }

  async delete(id: string): Promise<void> {
    await postgresPool.query('DELETE FROM pokemons WHERE id = $1', [id]);
  }
}
