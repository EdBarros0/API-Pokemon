import { AppError } from '../errors/app.error';

export class NotFoundError extends AppError {
  constructor(entityName: string) {
    const message = entityName.toLowerCase().includes('não encontrado')
      ? entityName
      : `${entityName} não encontrado(a)`;
    super(message, 404);
  }
}
