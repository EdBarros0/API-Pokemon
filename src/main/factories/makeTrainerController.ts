import { CreateTrainerUseCase } from '@application/use-cases/CreateTrainerUseCase';
import { GetTrainerByIdUseCase } from '@application/use-cases/GetTrainerByIdUseCase';
import { ListTrainersUseCase } from '@application/use-cases/ListTrainersUseCase';
import { UpdateTrainerUseCase } from '@application/use-cases/UpdateTrainerUseCase';
import { PgTrainerRepository } from '@infrastructure/database/postgres/PgTrainerRepository';
import { TrainerController } from '@infrastructure/http/controllers/TrainerController';

const trainerRepository = new PgTrainerRepository();

export function makeTrainerController(): TrainerController {
  return new TrainerController(
    new ListTrainersUseCase(trainerRepository),
    new GetTrainerByIdUseCase(trainerRepository),
    new CreateTrainerUseCase(trainerRepository),
    new UpdateTrainerUseCase(trainerRepository),
  );
}
