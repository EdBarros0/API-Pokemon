import axios from 'axios';
import { AppError } from '@domain/errors/app.error';
import type {
  ExternalPokemonDetails,
  PokemonExternalGateway,
} from '@domain/gateways/pokemon-external-gateway';

interface PokeApiPokemonResponse {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  types: Array<{ slot: number; type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    other?: { 'official-artwork'?: { front_default: string | null } };
  };
}

const unavailableMessage =
  'O serviço externo da PokeAPI está temporariamente indisponível. Tente novamente mais tarde';

export class PokeApiAxiosGateway implements PokemonExternalGateway {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async findByName(name: string): Promise<ExternalPokemonDetails | null> {
    const normalizedName = name.trim().toLowerCase();
    if (!normalizedName) return null;

    try {
      const { data } = await axios.get<PokeApiPokemonResponse>(
        `${this.baseUrl}/${encodeURIComponent(normalizedName)}/`,
        { timeout: 3000 },
      );
      const stat = (statName: string): number =>
        data.stats.find(({ stat: item }) => item.name === statName)
          ?.base_stat ?? 0;

      return {
        id: data.id,
        name: data.name,
        spriteUrl:
          data.sprites.other?.['official-artwork']?.front_default ?? null,
        baseExperience: data.base_experience,
        height: data.height,
        weight: data.weight,
        type:
          data.types
            .slice()
            .sort((a, b) => a.slot - b.slot)[0]
            ?.type.name.toUpperCase() ?? 'NORMAL',
        hp: stat('hp'),
        attack: stat('attack'),
        defense: stat('defense'),
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) return null;

        if (
          error.code === 'ECONNABORTED' ||
          error.code === 'ETIMEDOUT' ||
          error.code === 'ERR_BAD_RESPONSE' ||
          !error.response
        ) {
          throw new AppError(unavailableMessage, 503);
        }

        throw new AppError(unavailableMessage, 503);
      }

      throw new AppError(unavailableMessage, 503);
    }
  }
}
