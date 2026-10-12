import type { Trainer } from '@domain/entities/Trainer';
import type { CreateTrainerDTO } from '@application/dtos/CreateTrainerDTO';
import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';

export class CreateTrainerUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}
  
  async execute(trainer: CreateTrainerDTO): Promise<Trainer> {
    return this.trainerRepository.create(trainer);
  }
}
