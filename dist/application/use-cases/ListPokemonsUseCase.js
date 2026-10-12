"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPokemonsUseCase = void 0;
class ListPokemonsUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(type) {
        return this.pokemonRepository.findAll(type);
    }
}
exports.ListPokemonsUseCase = ListPokemonsUseCase;
//# sourceMappingURL=ListPokemonsUseCase.js.map