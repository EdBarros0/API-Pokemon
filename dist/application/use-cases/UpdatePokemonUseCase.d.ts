import type { Pokemon } from '../../domain/entities/Pokemon.js';
import type { IPokemonRepository } from '../../domain/repositories/IPokemonRepository.js';
export declare class UpdatePokemonUseCase {
    private readonly pokemonRepository;
    constructor(pokemonRepository: IPokemonRepository);
    execute(pokemon: Pokemon): Promise<void>;
}
//# sourceMappingURL=UpdatePokemonUseCase.d.ts.map