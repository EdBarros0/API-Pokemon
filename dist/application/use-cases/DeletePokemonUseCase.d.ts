import type { IPokemonRepository } from '../../domain/repositories/IPokemonRepository.js';
export declare class DeletePokemonUseCase {
    private readonly pokemonRepository;
    constructor(pokemonRepository: IPokemonRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DeletePokemonUseCase.d.ts.map