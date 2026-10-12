import type { CreateTrainerDTO } from '@application/dtos/CreateTrainerDTO';
import { CreateTrainerUseCase } from '@application/use-cases/CreateTrainerUseCase';
import { GetTrainerByIdUseCase } from '@application/use-cases/GetTrainerByIdUseCase';
import { ListTrainersUseCase } from '@application/use-cases/ListTrainersUseCase';
import { UpdateTrainerUseCase } from '@application/use-cases/UpdateTrainerUseCase';
import type { UpdateTrainerDTO } from '@application/dtos/UpdateTrainerDTO';
import type { Request, Response } from 'express';

function isCreateTrainerDTO(data: unknown): data is CreateTrainerDTO {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const trainer = data as Record<string, unknown>;

  return (
    typeof trainer.name === 'string' && trainer.name.trim().length > 0 &&
    typeof trainer.email === 'string' && trainer.email.trim().length > 0 &&
    typeof trainer.city === 'string' && trainer.city.trim().length > 0
  );
}

function isUpdateTrainerDTO(data: unknown): data is UpdateTrainerDTO {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const trainer = data as Record<string, unknown>;

  return (
    typeof trainer.name === 'string' && trainer.name.trim().length > 0 &&
    typeof trainer.email === 'string' && trainer.email.trim().length > 0 &&
    typeof trainer.city === 'string' && trainer.city.trim().length > 0
  );
}

export class TrainerController {
  constructor(
    private readonly listTrainersUseCase: ListTrainersUseCase,
    private readonly getTrainerByIdUseCase: GetTrainerByIdUseCase,
    private readonly createTrainerUseCase: CreateTrainerUseCase,
    private readonly updateTrainerUseCase: UpdateTrainerUseCase,
  ) {}

  list = async (_req: Request, res: Response): Promise<Response> => {
    const trainers = await this.listTrainersUseCase.execute();
    return res.status(200).json(trainers);
  };

  getById = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    const trainer = await this.getTrainerByIdUseCase.execute(req.params.id);
    return res.status(200).json(trainer);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    if (!isCreateTrainerDTO(req.body)) {
      return res.status(400).json({
        message: 'Dados do treinador inválidos. Informe name, email e city.',
      });
    }

    const trainer = await this.createTrainerUseCase.execute(req.body);

    return res.status(201).json({
      message: 'Treinador cadastrado com sucesso.',
      data: trainer,
    });
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    if (!isUpdateTrainerDTO(req.body)) {
      return res.status(400).json({
        message: 'Dados do treinador inválidos. Informe name, email e city.',
      });
    }

    const trainer = await this.updateTrainerUseCase.execute(
      req.params.id,
      req.body,
    );

    return res.status(200).json({
      message: 'Treinador atualizado com sucesso.',
      data: trainer,
    });
  };

}
