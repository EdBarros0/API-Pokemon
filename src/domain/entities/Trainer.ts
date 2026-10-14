import type { Pokemon } from '@domain/entities/Pokemon';

export interface Trainer {
  id: string;
  name: string;
  email: string;
  city: string;
  createdAt: Date;
}

export interface TrainerWithPokemons extends Trainer {
  pokemons: Pokemon[];
}
