import type { Trainer } from '@domain/entities/Trainer';
import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';

export class SearchTrainersByNameUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  execute(name: string): Promise<Trainer[]> {
    return this.trainerRepository.searchByName(name.trim());
  }
}
