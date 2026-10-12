"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePokemonUseCase = void 0;
const app_error_1 = require("../../domain/errors/app.error.js");
class CreatePokemonUseCase {
    pokemonRepository;
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }
    async execute(pokemon) {
        const existingPokemon = await this.pokemonRepository.findById(pokemon.id);
        if (existingPokemon) {
            throw new app_error_1.AppError('Já existe um Pokémon cadastrado com este ID.', 409);
        }
        await this.pokemonRepository.create(pokemon);
    }
}
exports.CreatePokemonUseCase = CreatePokemonUseCase;
//# sourceMappingURL=CreatePokemonUseCase.js.map