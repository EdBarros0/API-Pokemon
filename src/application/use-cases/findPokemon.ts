import { NotFoundError } from '@domain/errors/not-found-error';
import type {
  PokemonDetails,
  PokemonGateway,
} from '@domain/gateways/pokemons-gateway';

export class FindPokemonUseCase {
  constructor(private readonly pokemonGateway: PokemonGateway) {}

  async execute(idOrName: string): Promise<PokemonDetails> {
    const pokemon = await this.pokemonGateway.findPokemonByID(idOrName);

    if (!pokemon) {
      throw new NotFoundError('Pokémon');
    }

    return pokemon;
  }
}
