export interface ExternalPokemonDetails {
  id: number;
  name: string;
  spriteUrl: string | null;
  baseExperience: number | null;
  height: number;
  weight: number;
  type: string;
  hp: number;
  attack: number;
  defense: number;
}

export interface PokemonExternalGateway {
  findByName(name: string): Promise<ExternalPokemonDetails | null>;
}
