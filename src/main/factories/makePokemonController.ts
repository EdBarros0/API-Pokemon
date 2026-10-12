import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { CountPokemonsUseCase } from '@application/use-cases/CountPokemonsUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { UpdatePokemonLevelUseCase } from '@application/use-cases/UpdatePokemonLevelUseCase';
import { SearchPokemonsByNameUseCase } from '@application/use-cases/SearchPokemonsByNameUseCase';
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';
import { PgPokemonRepository } from '@infrastructure/database/postgres/PgPokemonRepository';

const pokemonRepository = new PgPokemonRepository();

export function makePokemonController(): PokemonController {
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const updatePokemonLevelUseCase = new UpdatePokemonLevelUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    new SearchPokemonsByNameUseCase(pokemonRepository),
    new CountPokemonsUseCase(pokemonRepository),
    getPokemonByIdUseCase,
    createPokemonUseCase,
    updatePokemonUseCase,
    updatePokemonLevelUseCase,
    deletePokemonUseCase,
  );
}
