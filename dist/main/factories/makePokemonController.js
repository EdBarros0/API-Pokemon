"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePokemonController = makePokemonController;
const CreatePokemonUseCase_1 = require("../../application/use-cases/CreatePokemonUseCase.js");
const DeletePokemonUseCase_1 = require("../../application/use-cases/DeletePokemonUseCase.js");
const GetPokemonByIdUseCase_1 = require("../../application/use-cases/GetPokemonByIdUseCase.js");
const ListPokemonsUseCase_1 = require("../../application/use-cases/ListPokemonsUseCase.js");
const UpdatePokemonUseCase_1 = require("../../application/use-cases/UpdatePokemonUseCase.js");
const InMemoryPokemonRepository_1 = require("../../infrastructure/database/in-memory/InMemoryPokemonRepository.js");
const PokemonController_1 = require("../../infrastructure/http/controllers/PokemonController.js");
function makePokemonController() {
    const pokemonRepository = new InMemoryPokemonRepository_1.InMemoryPokemonRepository();
    const listPokemonsUseCase = new ListPokemonsUseCase_1.ListPokemonsUseCase(pokemonRepository);
    const getPokemonByIdUseCase = new GetPokemonByIdUseCase_1.GetPokemonByIdUseCase(pokemonRepository);
    const createPokemonUseCase = new CreatePokemonUseCase_1.CreatePokemonUseCase(pokemonRepository);
    const updatePokemonUseCase = new UpdatePokemonUseCase_1.UpdatePokemonUseCase(pokemonRepository);
    const deletePokemonUseCase = new DeletePokemonUseCase_1.DeletePokemonUseCase(pokemonRepository);
    return new PokemonController_1.PokemonController(listPokemonsUseCase, getPokemonByIdUseCase, createPokemonUseCase, updatePokemonUseCase, deletePokemonUseCase);
}
//# sourceMappingURL=makePokemonController.js.map