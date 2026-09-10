import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { InMemoryPokemonRepository } from '@infrastructure/database/in-memory/InMemoryPokemonRepository';
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';

export function makePokemonController(): PokemonController {
  const pokemonRepository = new InMemoryPokemonRepository();

  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    getPokemonByIdUseCase,
    createPokemonUseCase,
    updatePokemonUseCase,
    deletePokemonUseCase,
  );
}
