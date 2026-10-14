import { FindPokemonUseCase } from '@application/use-cases/findPokemon';
import { PokeAPIGateway } from '@infrastructure/gateways/pokeAPI-gateway';
import { InMemoryPokemonGateway } from '@infrastructure/gateways/in-memory-pokemon-gateway';
import { PokeAPIController } from '@infrastructure/http/controllers/PokeAPIController';
import type { PokemonGateway } from '@domain/gateways/pokemons-gateway';
import { env } from 'node:process';

export function makePokeAPIController(): PokeAPIController {
  const pokemonGateway: PokemonGateway =
    env.USE_EXTERNAL_API?.toLowerCase() === 'false'
      ? new InMemoryPokemonGateway()
      : new PokeAPIGateway();
  const findPokemonUseCase = new FindPokemonUseCase(pokemonGateway);

  return new PokeAPIController(findPokemonUseCase);
}
