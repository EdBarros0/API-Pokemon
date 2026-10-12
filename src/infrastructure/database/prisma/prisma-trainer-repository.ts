import { Trainer } from '../../../domain/entities/Trainer';
import { ITrainerRepository } from '../../../domain/repositories/ITrainerRepository';
import { prisma } from './client';

export class PrismaTrainerRepository implements ITrainerRepository {
  async findAll(): Promise<Trainer[]> {
    return prisma.trainer.findMany();
  }
  
  async findById(id: string): Promise<Trainer | null> {
    return prisma.trainer.findUnique({ where: { id } });
  }

  async create(trainer: Pick<Trainer, 'name' | 'email' | 'city'>): Promise<Trainer> {
    return prisma.trainer.create({ data: trainer });
  }
  
  async update(trainer: Trainer): Promise<void> {
    await prisma.trainer.update({
      where: { id: trainer.id },
      data: {
        name: trainer.name,
        email: trainer.email,
        city: trainer.city,
      },
    });
  }
}