export interface UpdatePokemonDTO {
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  level: number;
  trainerId?: string | undefined;
}
