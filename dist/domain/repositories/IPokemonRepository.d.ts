import type { Pokemon } from '../entities/Pokemon.js';
export interface IPokemonRepository {
    findAll(type?: string): Promise<Pokemon[]>;
    findById(id: string): Promise<Pokemon | null>;
    create(pokemon: Pokemon): Promise<void>;
    update(pokemon: Pokemon): Promise<void>;
    updateLevel(id: string, newLevel: number): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IPokemonRepository.d.ts.map