import type { Trainer } from '@domain/entities/Trainer';
import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';

export class ListTrainersUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  execute(): Promise<Trainer[]> {
    return this.trainerRepository.findAll();
  }
}
