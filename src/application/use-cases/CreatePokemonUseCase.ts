import type { Pokemon } from '@domain/entities/Pokemon';
import type { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import type { CreatePokemonDTO } from '@application/dtos/CreatePokemonDTO';
import { AppError } from '@domain/errors/app.error';
import { NotFoundError } from '@domain/errors/not-found-error';
import type { PokemonExternalGateway } from '@domain/gateways/pokemon-external-gateway';

export class CreatePokemonUseCase {
  constructor(
    private readonly pokemonRepository: IPokemonRepository,
    private readonly pokemonExternalGateway: PokemonExternalGateway,
  ) {}

  async execute(input: CreatePokemonDTO): Promise<Pokemon> {
    const externalPokemon = await this.pokemonExternalGateway.findByName(
      input.name,
    );

    if (!externalPokemon) {
      throw new NotFoundError(
        'Pokémon não encontrado na base oficial da PokeAPI',
      );
    }

    const id = String(externalPokemon.id);
    const existingPokemon = await this.pokemonRepository.findById(id);
    if (existingPokemon) {
      throw new AppError('Já existe um Pokémon cadastrado com este ID.', 409);
    }

    const pokemon: Pokemon = {
      id,
      name: externalPokemon.name,
      type: externalPokemon.type,
      hp: externalPokemon.hp,
      attack: externalPokemon.attack,
      defense: externalPokemon.defense,
      level: input.level ?? 1,
      trainerId: input.trainerId ?? null,
      spriteUrl: externalPokemon.spriteUrl,
      baseExperience: externalPokemon.baseExperience,
      height: externalPokemon.height,
      weight: externalPokemon.weight,
    };

    return this.pokemonRepository.create(pokemon);
  }
}
