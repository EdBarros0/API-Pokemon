import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { postgresPool } from './connection';

function mapPokemonRow(row: Record<string, unknown>): Pokemon {
  const { trainer_id: trainerId, ...pokemon } = row;
  return { ...pokemon, trainerId: trainerId ?? null } as Pokemon;
}

export class PgPokemonRepository implements IPokemonRepository {
  async findAll(filters: { type?: string; minLevel: number; maxLevel: number }): Promise<Pokemon[]> {
    const values: (string | number)[] = [filters.minLevel, filters.maxLevel];
    const conditions = ['level >= $1', 'level <= $2'];
    if (filters.type) {
      values.push(filters.type);
      conditions.push(`UPPER(type) = UPPER($${values.length})`);
    }

    const result = await postgresPool.query(
      `SELECT * FROM pokemons WHERE ${conditions.join(' AND ')}`,
      values,
    );
    return result.rows.map(mapPokemonRow);
  }

  async searchByName(term: string): Promise<Pokemon[]> {
    const result = await postgresPool.query(
      'SELECT * FROM pokemons WHERE name ILIKE $1',
      [`%${term}%`],
    );
    return result.rows.map(mapPokemonRow);
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
    const row = result.rows[0];
    return row ? mapPokemonRow(row) : null;
  }

  async create(pokemon: Pokemon): Promise<Pokemon> {
    const result = await postgresPool.query(
      'INSERT INTO pokemons (id, name, type, hp, attack, defense, level, trainer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [pokemon.id, pokemon.name, pokemon.type, pokemon.hp, pokemon.attack, pokemon.defense, pokemon.level, pokemon.trainerId],
    );
    const row = result.rows[0];
    return mapPokemonRow(row);
  }
  
  async update(pokemon: Pokemon): Promise<void> {
    await postgresPool.query(
      'UPDATE pokemons SET name = $1, type = $2, hp = $3, attack = $4, defense = $5, level = $6, trainer_id = $7 WHERE id = $8',
      [pokemon.name, pokemon.type, pokemon.hp, pokemon.attack, pokemon.defense, pokemon.level, pokemon.trainerId, pokemon.id],
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
