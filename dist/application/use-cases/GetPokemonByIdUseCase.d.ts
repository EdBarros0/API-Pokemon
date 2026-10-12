import type { Pokemon } from '../../domain/entities/Pokemon.js';
import type { IPokemonRepository } from '../../domain/repositories/IPokemonRepository.js';
export declare class GetPokemonByIdUseCase {
    private readonly pokemonRepository;
    constructor(pokemonRepository: IPokemonRepository);
    execute(id: string): Promise<Pokemon>;
}
//# sourceMappingURL=GetPokemonByIdUseCase.d.ts.map