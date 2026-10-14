import axios from 'axios';
import type {
  PokemonDetails,
  PokemonGateway,
} from '@domain/gateways/pokemons-gateway';
import { AppError } from '@domain/errors/app.error';

interface PokeAPIPokemonResponse {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  types: Array<{ slot: number; type: { name: string } }>;
  abilities: Array<{
    is_hidden: boolean;
    ability: { name: string };
  }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: { front_default: string | null };
    };
  };
}

const unavailableMessage =
  'O serviço externo da PokeAPI está temporariamente indisponível. Tente novamente mais tarde';

export class PokeAPIGateway implements PokemonGateway {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async findPokemonByID(idOrName: string): Promise<PokemonDetails | null> {
    const identifier = idOrName.trim().toLowerCase();

    if (!identifier) {
      return null;
    }

    try {
      const response = await axios.get<PokeAPIPokemonResponse>(
        `${this.baseUrl}/${encodeURIComponent(identifier)}/`,
        { timeout: 3000 },
      );

      return {
        id: response.data.id,
        name: response.data.name,
        base_experience: response.data.base_experience,
        // A PokéAPI registra altura em decímetros e peso em hectogramas.
        height: response.data.height,
        weight: response.data.weight,
        types: response.data.types
          .sort((a, b) => a.slot - b.slot)
          .map(({ type }) => type.name),
        abilities: response.data.abilities.map(({ ability, is_hidden }) => ({
          name: ability.name,
          isHidden: is_hidden,
        })),
        stats: response.data.stats.map(({ stat, base_stat }) => ({
          name: stat.name,
          baseStat: base_stat,
        })),
        sprites: {
          frontDefault: response.data.sprites.front_default,
          officialArtwork:
            response.data.sprites.other?.['official-artwork']?.front_default ??
            null,
        },
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return null;
        }

        throw new AppError(unavailableMessage, 503);
      }

      throw new AppError(unavailableMessage, 503);
    }
  }
}
