import { Trainer, TrainerWithPokemons } from '../entities/Trainer';

export interface ITrainerRepository {
  findAll(): Promise<Trainer[]>;
  searchByName(name: string): Promise<Trainer[]>;
  findById(id: string): Promise<Trainer | null>;
  findByIdWithPokemons(id: string): Promise<TrainerWithPokemons | null>;
  create(trainer: Pick<Trainer, 'name' | 'email' | 'city'>): Promise<Trainer>;
  update(trainer: Trainer): Promise<void>;
}
