import { Pokemon } from '../../../domain/entities/Pokemon';
import { IPokemonRepository } from '../../../domain/repositories/IPokemonRepository';
import { prisma } from './client';

export class PrismaPokemonRepository implements IPokemonRepository {
  async findAll(type?: string): Promise<Pokemon[]> {
    if (!type) {
      return prisma.pokemon.findMany();
    }

    return prisma.pokemon.findMany({
      where: { type: { equals: type, mode: 'insensitive' } },
    });
  }

  async searchByName(term: string): Promise<Pokemon[]> {
    return prisma.pokemon.findMany({
      where: { name: { contains: term, mode: 'insensitive' } },
    });
  }

  async count(): Promise<number> {
    return prisma.pokemon.count();
  }

  async findById(id: string): Promise<Pokemon | null> {
    return prisma.pokemon.findUnique({ where: { id } });
  }

  async create(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.create({ data: pokemon });
  }

  async update(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.update({
      where: { id: pokemon.id },
      data: {
        name: pokemon.name,
        type: pokemon.type,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        ...(pokemon.level !== undefined ? { level: pokemon.level } : {}),
      },
    });
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    await prisma.pokemon.update({
      where: { id },
      data: { level: newLevel },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.pokemon.delete({ where: { id } });
  }
} 