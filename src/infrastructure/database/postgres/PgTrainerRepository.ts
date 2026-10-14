import type { Trainer, TrainerWithPokemons } from '@domain/entities/Trainer';
import type { Pokemon } from '@domain/entities/Pokemon';
import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { AppError } from '@domain/errors/app.error';
import { postgresPool } from './connection';

type TrainerRow = Omit<Trainer, 'createdAt'> & { created_at: Date | string };

function mapTrainerRow(row: TrainerRow): Trainer {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    city: row.city,
    createdAt: new Date(row.created_at),
  };
}

export class PgTrainerRepository implements ITrainerRepository {
  async findAll(): Promise<Trainer[]> {
    const result = await postgresPool.query('SELECT * FROM trainers');
    return result.rows.map(mapTrainerRow);
  }

  async searchByName(name: string): Promise<Trainer[]> {
    const result = await postgresPool.query(
      'SELECT * FROM trainers WHERE name ILIKE $1 ORDER BY name ASC',
      [`%${name}%`],
    );
    return result.rows.map(mapTrainerRow);
  }

  async findById(id: string): Promise<Trainer | null> {
    const result = await postgresPool.query(
      'SELECT * FROM trainers WHERE id = $1',
      [id],
    );
    const row = result.rows[0] as TrainerRow | undefined;
    return row ? mapTrainerRow(row) : null;
  }

  async findByIdWithPokemons(id: string): Promise<TrainerWithPokemons | null> {
    const result = await postgresPool.query(
      `SELECT t.*,
        COALESCE(
          json_agg(json_build_object(
            'id', p.id,
            'name', p.name,
            'type', p.type,
            'hp', p.hp,
            'attack', p.attack,
            'defense', p.defense,
            'level', p.level,
            'trainerId', p.trainer_id,
            'spriteUrl', p.sprite_url,
            'baseExperience', p.base_experience,
            'height', p.height,
            'weight', p.weight
          ) ORDER BY p.name) FILTER (WHERE p.id IS NOT NULL),
          '[]'::json
        ) AS pokemons
      FROM trainers t
      LEFT JOIN pokemons p ON p.trainer_id = t.id
      WHERE t.id = $1
      GROUP BY t.id`,
      [id],
    );
    const row = result.rows[0] as
      (TrainerRow & { pokemons: Pokemon[] }) | undefined;

    return row ? { ...mapTrainerRow(row), pokemons: row.pokemons } : null;
  }

  async create(
    trainer: Pick<Trainer, 'name' | 'email' | 'city'>,
  ): Promise<Trainer> {
    try {
      const result = await postgresPool.query(
        'INSERT INTO trainers (name, email, city) VALUES ($1, $2, $3) RETURNING *',
        [trainer.name, trainer.email, trainer.city],
      );
      return mapTrainerRow(result.rows[0] as TrainerRow);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new AppError(
          'Já existe um Treinador cadastrado com este e-mail.',
          409,
        );
      }

      throw error;
    }
  }

  async update(trainer: Trainer): Promise<void> {
    await postgresPool.query(
      'UPDATE trainers SET name = $1, email = $2, city = $3 WHERE id = $4',
      [trainer.name, trainer.email, trainer.city, trainer.id],
    );
  }
}
