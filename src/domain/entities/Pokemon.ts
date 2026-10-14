export interface Pokemon {
  id: string;
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  level: number;
  trainerId: string | null;
  spriteUrl: string | null;
  baseExperience: number | null;
  height: number | null;
  weight: number | null;
}
