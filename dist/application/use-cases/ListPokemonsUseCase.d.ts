import type { Pokemon } from '../../domain/entities/Pokemon.js';
import type { IPokemonRepository } from '../../domain/repositories/IPokemonRepository.js';
export declare class ListPokemonsUseCase {
    private readonly pokemonRepository;
    constructor(pokemonRepository: IPokemonRepository);
    execute(type?: string): Promise<Pokemon[]>;
}
//# sourceMappingURL=ListPokemonsUseCase.d.ts.map