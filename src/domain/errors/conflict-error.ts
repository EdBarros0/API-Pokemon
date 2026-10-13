import { AppError } from '../errors/app.error';

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}