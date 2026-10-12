"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPokemonRepository = void 0;
class InMemoryPokemonRepository {
    pokemons = [];
    async findAll(type) {
        if (!type) {
            return this.pokemons;
        }
        return this.pokemons.filter((pokemon) => pokemon.type.toLowerCase() === type.toLowerCase());
    }
    async findById(id) {
        return this.pokemons.find((pokemon) => pokemon.id === id) ?? null;
    }
    async create(pokemon) {
        this.pokemons.push(pokemon);
    }
    async update(pokemon) {
        const index = this.pokemons.findIndex((storedPokemon) => storedPokemon.id === pokemon.id);
        if (index >= 0) {
            this.pokemons[index] = pokemon;
        }
    }
    async delete(id) {
        this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    }
}
exports.InMemoryPokemonRepository = InMemoryPokemonRepository;
//# sourceMappingURL=InMemoryPokemonRepository.js.map