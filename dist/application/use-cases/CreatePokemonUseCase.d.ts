import type { Pokemon } from '../../domain/entities/Pokemon.js';
import type { IPokemonRepository } from '../../domain/repositories/IPokemonRepository.js';
export declare class CreatePokemonUseCase {
    private readonly pokemonRepository;
    constructor(pokemonRepository: IPokemonRepository);
    execute(pokemon: Pokemon): Promise<void>;
}
//# sourceMappingURL=CreatePokemonUseCase.d.ts.map