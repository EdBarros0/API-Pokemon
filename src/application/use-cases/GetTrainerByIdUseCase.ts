import type { TrainerWithPokemons } from '@domain/entities/Trainer';
import { AppError } from '@domain/errors/app.error';
import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';

export class GetTrainerByIdUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  async execute(id: string): Promise<TrainerWithPokemons> {
    const trainer = await this.trainerRepository.findByIdWithPokemons(id);

    if (!trainer) {
      throw new AppError('Treinador não encontrado.', 404);
    }

    return trainer;
  }
}
