"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
function hasValidPokemonFields(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }
    const pokemon = data;
    return (typeof pokemon.name === 'string' &&
        typeof pokemon.type === 'string' &&
        typeof pokemon.hp === 'number' &&
        typeof pokemon.attack === 'number' &&
        typeof pokemon.defense === 'number');
}
function isCreatePokemonDTO(data) {
    if (!hasValidPokemonFields(data)) {
        return false;
    }
    const pokemon = data;
    return typeof pokemon.id === 'string';
}
class PokemonController {
    listPokemonsUseCase;
    getPokemonByIdUseCase;
    createPokemonUseCase;
    updatePokemonUseCase;
    deletePokemonUseCase;
    constructor(listPokemonsUseCase, getPokemonByIdUseCase, createPokemonUseCase, updatePokemonUseCase, deletePokemonUseCase) {
        this.listPokemonsUseCase = listPokemonsUseCase;
        this.getPokemonByIdUseCase = getPokemonByIdUseCase;
        this.createPokemonUseCase = createPokemonUseCase;
        this.updatePokemonUseCase = updatePokemonUseCase;
        this.deletePokemonUseCase = deletePokemonUseCase;
    }
    list = async (req, res) => {
        const type = typeof req.query.type === 'string' ? req.query.type : undefined;
        const pokemons = await this.listPokemonsUseCase.execute(type);
        return res.status(200).json(pokemons);
    };
    getById = async (req, res) => {
        const pokemon = await this.getPokemonByIdUseCase.execute(req.params.id);
        return res.status(200).json(pokemon);
    };
    create = async (req, res) => {
        const pokemon = req.body;
        await this.createPokemonUseCase.execute(pokemon);
        return res.status(201).json({
            message: 'Pokémon criado com sucesso.',
            data: pokemon,
        });
    };
    update = async (req, res) => {
        if (!hasValidPokemonFields(req.body)) {
            return res.status(400).json({
                message: 'Dados do Pokémon inválidos.',
            });
        }
        const data = req.body;
        const pokemon = { ...data, id: req.params.id };
        await this.updatePokemonUseCase.execute(pokemon);
        return res.status(200).json(pokemon);
    };
    delete = async (req, res) => {
        await this.deletePokemonUseCase.execute(req.params.id);
        return res.status(204).send();
    };
}
exports.PokemonController = PokemonController;
//# sourceMappingURL=PokemonController.js.map