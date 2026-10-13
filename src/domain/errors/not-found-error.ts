import { AppError } from '../errors/app.error';

export class NotFoundError extends AppError {
  constructor(entityName: string) {
    super(`${entityName} não encontrado(a)`, 404);
  }
}
