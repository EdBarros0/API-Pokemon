import type { IPokemonRepository } from '../../domain/repositories/IPokemonRepository.js';
export declare class UpdatePokemonLevelUseCase {
    private readonly pokemonRepository;
    constructor(pokemonRepository: IPokemonRepository);
    execute(id: string, newLevel: number): Promise<void>;
}
//# sourceMappingURL=UpdatePokemonLevelUseCase.d.ts.map