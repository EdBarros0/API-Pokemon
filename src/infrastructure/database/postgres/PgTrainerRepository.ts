import type { Trainer } from '@domain/entities/Trainer';
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
  
  async findById(id: string): Promise<Trainer | null> {
    const result = await postgresPool.query('SELECT * FROM trainers WHERE id = $1', [id]);
    const row = result.rows[0] as TrainerRow | undefined;
    return row ? mapTrainerRow(row) : null;
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
    } catch (error: any) {
      if (error.code === '23505') {
        throw new AppError('Já existe um Treinador cadastrado com este e-mail.', 409);
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
