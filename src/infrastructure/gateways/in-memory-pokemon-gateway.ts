import type {
  PokemonDetails,
  PokemonGateway,
} from '@domain/gateways/pokemons-gateway';
import type {
  ExternalPokemonDetails,
  PokemonExternalGateway,
} from '@domain/gateways/pokemon-external-gateway';

export class InMemoryPokemonGateway
  implements PokemonGateway, PokemonExternalGateway
{
  public pokemons: Record<string, PokemonDetails> = {
    '25': {
      id: 25,
      name: 'pikachu',
      base_experience: 112,
      height: 4,
      weight: 60,
      types: ['electric'],
      abilities: [{ name: 'static', isHidden: false }],
      stats: [
        { name: 'hp', baseStat: 35 },
        { name: 'attack', baseStat: 55 },
        { name: 'defense', baseStat: 40 },
      ],
      sprites: {
        frontDefault:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        officialArtwork:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      },
    },
    '4': {
      id: 4,
      name: 'charmander',
      base_experience: 62,
      height: 6,
      weight: 85,
      types: ['fire'],
      abilities: [{ name: 'blaze', isHidden: false }],
      stats: [
        { name: 'hp', baseStat: 39 },
        { name: 'attack', baseStat: 52 },
        { name: 'defense', baseStat: 43 },
      ],
      sprites: {
        frontDefault:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        officialArtwork:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      },
    },
    '1': {
      id: 1,
      name: 'bulbasaur',
      base_experience: 64,
      height: 7,
      weight: 69,
      types: ['grass', 'poison'],
      abilities: [{ name: 'overgrow', isHidden: false }],
      stats: [
        { name: 'hp', baseStat: 45 },
        { name: 'attack', baseStat: 49 },
        { name: 'defense', baseStat: 49 },
      ],
      sprites: {
        frontDefault:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        officialArtwork:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  };

  public shouldThrowError = false;

  async findPokemonByID(idOrName: string): Promise<PokemonDetails | null> {
    if (this.shouldThrowError) {
      throw new Error('Falha simulada ao consultar a PokéAPI');
    }
    return this.find(idOrName);
  }

  async findByName(name: string): Promise<ExternalPokemonDetails | null> {
    if (this.shouldThrowError) {
      throw new Error('Falha simulada ao consultar a PokéAPI');
    }

    const pokemon = this.find(name);
    if (!pokemon) return null;

    const stat = (key: string): number =>
      pokemon.stats.find(({ name: statName }) => statName === key)?.baseStat ??
      0;

    return {
      id: pokemon.id,
      name: pokemon.name,
      spriteUrl: pokemon.sprites.officialArtwork,
      baseExperience: pokemon.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
      type: pokemon.types[0]?.toUpperCase() ?? 'NORMAL',
      hp: stat('hp'),
      attack: stat('attack'),
      defense: stat('defense'),
    };
  }

  private find(identifier: string): PokemonDetails | null {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    return (
      this.pokemons[normalizedIdentifier] ??
      Object.values(this.pokemons).find(
        (pokemon) => pokemon.name === normalizedIdentifier,
      ) ??
      null
    );
  }
}
