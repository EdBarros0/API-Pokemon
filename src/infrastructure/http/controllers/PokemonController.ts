import type { UpdatePokemonDTO } from '@application/dtos/UpdatePokemonDTO';
import type { CreatePokemonInput, UpdatePokemonLevelInput } from '@infrastructure/http/schemas/pokemon-schemas';
import { CreatePokemonUseCase } from '@application/use-cases/CreatePokemonUseCase';
import { CountPokemonsUseCase } from '@application/use-cases/CountPokemonsUseCase';
import { DeletePokemonUseCase } from '@application/use-cases/DeletePokemonUseCase';
import { GetPokemonByIdUseCase } from '@application/use-cases/GetPokemonByIdUseCase';
import { ListPokemonsUseCase } from '@application/use-cases/ListPokemonsUseCase';
import { UpdatePokemonUseCase } from '@application/use-cases/UpdatePokemonUseCase';
import { UpdatePokemonLevelUseCase } from '@application/use-cases/UpdatePokemonLevelUseCase';
import { SearchPokemonsByNameUseCase } from '@application/use-cases/SearchPokemonsByNameUseCase';
import type { Request, Response } from 'express';

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
    const query = req.query as unknown as {
      type?: string;
      minLevel: number;
      maxLevel: number;
    };
    const pokemons = await this.listPokemonsUseCase.execute(query);

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
    const pokemon = await this.createPokemonUseCase.execute(req.body as CreatePokemonInput);

    return res.status(201).json({
      message: 'Pokémon criado com sucesso.',
      data: pokemon,
    });
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    const data = req.body as UpdatePokemonDTO;
    const pokemon = await this.updatePokemonUseCase.execute(req.params.id, data);

    return res.status(200).json(pokemon);
  };

  updateLevel = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<Response> => {
    const { newLevel } = req.body as UpdatePokemonLevelInput;

    await this.updatePokemonLevelUseCase.execute(
      req.params.id,
      newLevel,
    );

    return res.status(200).json({
      message: 'Nível do Pokémon atualizado com sucesso.',
      id: req.params.id,
      newLevel,
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
