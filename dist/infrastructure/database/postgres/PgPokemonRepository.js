"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgPokemonRepository = void 0;
const connection_1 = require("./connection");
class PgPokemonRepository {
    async findAll(type) {
        const query = type
            ? 'SELECT * FROM pokemons WHERE type = $1'
            : 'SELECT * FROM pokemons';
        const values = type ? [type] : [];
        const result = await connection_1.postgresPool.query(query, values);
        return result.rows;
    }
    async findById(id) {
        const result = await connection_1.postgresPool.query('SELECT * FROM pokemons WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    async create(pokemon) {
        await connection_1.postgresPool.query('INSERT INTO pokemons (id, name, type, hp, attack, defense) VALUES ($1, $2, $3, $4, $5, $6)', [pokemon.id, pokemon.name, pokemon.type, pokemon.hp, pokemon.attack, pokemon.defense]);
    }
    async update(pokemon) {
        await connection_1.postgresPool.query('UPDATE pokemons SET name = $1, type = $2, hp = $3, attack = $4, defense = $5 WHERE id = $6', [pokemon.name, pokemon.type, pokemon.hp, pokemon.attack, pokemon.defense, pokemon.id]);
    }
    async updateLevel(id, newLevel) {
        await connection_1.postgresPool.query('UPDATE pokemons SET level = $1 WHERE id = $2', [newLevel, id]);
    }
    async delete(id) {
        await connection_1.postgresPool.query('DELETE FROM pokemons WHERE id = $1', [id]);
    }
}
exports.PgPokemonRepository = PgPokemonRepository;
//# sourceMappingURL=PgPokemonRepository.js.map