import { Trainer } from '../entities/Trainer';

export interface ITrainerRepository {
  findAll(): Promise<Trainer[]>;
  findById(id: string): Promise<Trainer | null>;
  create(trainer: Pick<Trainer, 'name' | 'email' | 'city'>): Promise<Trainer>;
  update(trainer: Trainer): Promise<void>;
}
