import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prisma-trainer-repository';
import { CreateTrainerUseCase } from '@application/use-cases/CreateTrainerUseCase';
import { GetTrainerByIdUseCase } from '@application/use-cases/GetTrainerByIdUseCase';
import { ListTrainersUseCase } from '@application/use-cases/ListTrainersUseCase';
import { UpdateTrainerUseCase } from '@application/use-cases/UpdateTrainerUseCase';
import { TrainerController } from '@infrastructure/http/controllers/TrainerController';

const trainerRepository = new PrismaTrainerRepository();

export function makeTrainerController(): TrainerController {
  const listTrainersUseCase = new ListTrainersUseCase(trainerRepository);
  const getTrainerByIdUseCase = new GetTrainerByIdUseCase(trainerRepository);
  const createTrainerUseCase = new CreateTrainerUseCase(trainerRepository);
  const updateTrainerUseCase = new UpdateTrainerUseCase(trainerRepository);

  return new TrainerController(
    listTrainersUseCase,
    getTrainerByIdUseCase,
    createTrainerUseCase,
    updateTrainerUseCase,
  );
}