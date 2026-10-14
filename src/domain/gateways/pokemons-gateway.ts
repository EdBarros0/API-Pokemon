export interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  types: string[];
  abilities: Array<{ name: string; isHidden: boolean }>;
  stats: Array<{ name: string; baseStat: number }>;
  sprites: {
    frontDefault: string | null;
    officialArtwork: string | null;
  };
}

export interface PokemonGateway {
  findPokemonByID(idOrName: string): Promise<PokemonDetails | null>;
}
