import type { CreatePokemonDTO } from '@application/dtos/CreatePokemonDTO';
import type { UpdatePokemonDTO } from '@application/dtos/UpdatePokemonDTO';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
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

export class PokemonController {
  constructor(
    private readonly listPokemonsUseCase: ListPokemonsUseCase,
    private readonly getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private readonly createPokemonUseCase: CreatePokemonUseCase,
    private readonly updatePokemonUseCase: UpdatePokemonUseCase,
    private readonly deletePokemonUseCase: DeletePokemonUseCase,
  ) {}

  list = async (req: Request, res: Response): Promise<Response> => {
    const type =
      typeof req.query.type === 'string' ? req.query.type : undefined;
    const pokemons = await this.listPokemonsUseCase.execute(type);

    return res.status(200).json(pokemons);
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

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    await this.deletePokemonUseCase.execute(req.params.id);

    return res.status(204).send();
  };
}
