import type { CreatePokemonDTO } from '@application/dtos/CreatePokemonDTO';
import type { UpdatePokemonLevelDTO } from '@application/dtos/UpdatePokemonLevelDTO';
import type { UpdatePokemonDTO } from '@application/dtos/UpdatePokemonDTO';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { CountPokemonsUseCase } from '@application/use-cases/CountPokemonsUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { UpdatePokemonLevelUseCase } from '@application/use-cases/UpdatePokemonLevelUseCase';
import { SearchPokemonsByNameUseCase } from '@application/use-cases/SearchPokemonsByNameUseCase';
import type { Request, Response } from 'express';

function hasValidPokemonFields(data: unknown): data is UpdatePokemonDTO {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const pokemon = data as Record<string, unknown>;

  return (
    typeof pokemon.name === 'string' &&
    typeof pokemon.type === 'string' &&
    typeof pokemon.hp === 'number' &&
    typeof pokemon.attack === 'number' &&
    typeof pokemon.defense === 'number'
  );
}

function isCreatePokemonDTO(data: unknown): data is CreatePokemonDTO {
  if (!hasValidPokemonFields(data)) {
    return false;
  }

  const pokemon = data as unknown as Record<string, unknown>;

  return typeof pokemon.id === 'string';
}

function isUpdatePokemonLevelDTO(data: unknown): data is UpdatePokemonLevelDTO {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const payload = data as Record<string, unknown>;

  return typeof payload.newLevel === 'number' && Number.isInteger(payload.newLevel);
}

export class PokemonController {
  constructor(
    private readonly listPokemonsUseCase: ListPokemonsUseCase,
    private readonly searchPokemonsByNameUseCase: SearchPokemonsByNameUseCase,
    private readonly countPokemonsUseCase: CountPokemonsUseCase,
    private readonly getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private readonly createPokemonUseCase: CreatePokemonUseCase,
    private readonly updatePokemonUseCase: UpdatePokemonUseCase,
    private readonly updatePokemonLevelUseCase: UpdatePokemonLevelUseCase,
    private readonly deletePokemonUseCase: DeletePokemonUseCase,
  ) {}

  list = async (req: Request, res: Response): Promise<Response> => {
    const type =
      typeof req.query.type === 'string' ? req.query.type : undefined;
    const pokemons = await this.listPokemonsUseCase.execute(type);

    return res.status(200).json(pokemons);
  };

  searchByName = async (req: Request, res: Response): Promise<Response> => {
    const term = typeof req.query.name === 'string' ? req.query.name.trim() : '';

    if (!term) {
      return res.status(400).json({ message: 'Informe o parâmetro name.' });
    }

    const pokemons = await this.searchPokemonsByNameUseCase.execute(term);
    return res.status(200).json(pokemons);
  };

  count = async (_req: Request, res: Response): Promise<Response> => {
    const total = await this.countPokemonsUseCase.execute();
    return res.status(200).json({ total });
  };

  getById = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    const pokemon = await this.getPokemonByIdUseCase.execute(req.params.id);

    return res.status(200).json(pokemon);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const pokemon = req.body;
    await this.createPokemonUseCase.execute(pokemon);

    return res.status(201).json({
      message: 'Pokémon criado com sucesso.',
      data: pokemon,
    });
  }

  update = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
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

  updateLevel = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    if (!isUpdatePokemonLevelDTO(req.body)) {
      return res.status(400).json({
        message: 'O campo newLevel deve ser um número inteiro.',
      });
    }

    await this.updatePokemonLevelUseCase.execute(
      req.params.id,
      req.body.newLevel,
    );

    return res.status(200).json({
      message: 'Nível do Pokémon atualizado com sucesso.',
      id: req.params.id,
      newLevel: req.body.newLevel,
    });
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    await this.deletePokemonUseCase.execute(req.params.id);

    return res.status(204).send();
  };
}
