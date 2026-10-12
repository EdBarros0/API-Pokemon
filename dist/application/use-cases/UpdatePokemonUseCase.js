"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePokemonUseCase = void 0;
const app_error_1 = require("../../domain/errors/app.error.js");
class UpdatePokemonUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(pokemon) {
        const existingPokemon = await this.pokemonRepository.findById(pokemon.id);
        if (!existingPokemon) {
            throw new app_error_1.AppError('Pokémon não encontrado.', 404);
        }
        await this.pokemonRepository.update(pokemon);
    }
}
exports.UpdatePokemonUseCase = UpdatePokemonUseCase;
//# sourceMappingURL=UpdatePokemonUseCase.js.map