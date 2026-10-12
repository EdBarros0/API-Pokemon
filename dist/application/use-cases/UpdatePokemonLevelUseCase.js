"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePokemonLevelUseCase = void 0;
const app_error_1 = require("../../domain/errors/app.error.js");
class UpdatePokemonLevelUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(id, newLevel) {
        const pokemon = await this.pokemonRepository.findById(id);
        if (!pokemon) {
            throw new app_error_1.AppError('Pokémon não encontrado.', 404);
        }
        await this.pokemonRepository.updateLevel(id, newLevel);
    }
}
exports.UpdatePokemonLevelUseCase = UpdatePokemonLevelUseCase;
//# sourceMappingURL=UpdatePokemonLevelUseCase.js.map