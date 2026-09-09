export class PokemonAlreadyExistsError extends Error {
  constructor(message = 'Já existe um Pokémon com este ID.') {
    super(message);
    this.name = 'PokemonAlreadyExistsError';
  }
}
