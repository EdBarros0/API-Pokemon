import type { Pokemon } from '../../../domain/entities/Pokemon.js';
import type { IPokemonRepository } from '../../../domain/repositories/IPokemonRepository.js';
export declare class PgPokemonRepository implements IPokemonRepository {
    findAll(type?: string): Promise<Pokemon[]>;
    findById(id: string): Promise<Pokemon | null>;
    create(pokemon: Pokemon): Promise<void>;
    update(pokemon: Pokemon): Promise<void>;
    updateLevel(id: string, newLevel: number): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PgPokemonRepository.d.ts.map