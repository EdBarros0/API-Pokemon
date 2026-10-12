import type { Trainer } from '@domain/entities/Trainer';
import type { UpdateTrainerDTO } from '@application/dtos/UpdateTrainerDTO';
import { AppError } from '@domain/errors/app.error';
import type { ITrainerRepository } from '@domain/repositories/ITrainerRepository';

export class UpdateTrainerUseCase {
  constructor(private readonly trainerRepository: ITrainerRepository) {}

  async execute(id: string, data: UpdateTrainerDTO): Promise<Trainer> {
    const existingTrainer = await this.trainerRepository.findById(id);

    if (!existingTrainer) {
      throw new AppError('Treinador não encontrado.', 404);
    }

    const trainer: Trainer = { ...existingTrainer, ...data };
    await this.trainerRepository.update(trainer);

    return trainer;
  }
}
