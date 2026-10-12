"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePokemonUseCase = void 0;
const app_error_1 = require("../../domain/errors/app.error.js");
class DeletePokemonUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(id) {
        const pokemon = await this.pokemonRepository.findById(id);
        if (!pokemon) {
            throw new app_error_1.AppError('Pokémon não encontrado.', 404);
        }
        await this.pokemonRepository.delete(id);
    }
}
exports.DeletePokemonUseCase = DeletePokemonUseCase;
//# sourceMappingURL=DeletePokemonUseCase.js.map