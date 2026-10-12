import { PrismaPokemonRepository } from '@infrastructure/database/prisma/prisma-pokemon-repository';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { UpdatePokemonLevelUseCase } from '@application/use-cases/UpdatePokemonLevelUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { SearchPokemonsByNameUseCase } from '@application/use-cases/SearchPokemonsByNameUseCase';
import { CountPokemonsUseCase } from '@application/use-cases/CountPokemonsUseCase'
import { PokemonController } from '@infrastructure/http/controllers/PokemonController';
const pokemonRepository = new PrismaPokemonRepository();

export function makePokemonController(): PokemonController {
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const searchPokemonsByNameUseCase = new SearchPokemonsByNameUseCase(pokemonRepository);
  const countPokemonsUseCase = new CountPokemonsUseCase(pokemonRepository);
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);
  const updatePokemonLevelUseCase = new UpdatePokemonLevelUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    searchPokemonsByNameUseCase,
    countPokemonsUseCase,
    getPokemonByIdUseCase,
    createPokemonUseCase,
    updatePokemonUseCase,
    updatePokemonLevelUseCase,
    deletePokemonUseCase
  );
}
