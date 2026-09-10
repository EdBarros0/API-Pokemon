export class ResourceNotFoundError extends Error {
  constructor(message = 'Pokémon não encontrado.') {
    super(message);
    this.name = 'ResourceNotFoundError';
  }
}
