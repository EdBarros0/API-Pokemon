import type { CreatePokemonDTO } from "../../../application/dtos/CreatePokemonDTO";
import type { UpdatePokemonDTO } from "../../../application/dtos/UpdatePokemonDTO";
import { CreatePokemonUseCase } from "../../../application/use-cases/CreatePokemonUseCase";
import { DeletePokemonUseCase } from "../../../application/use-cases/DeletePokemonUseCase";
import { GetPokemonByIdUseCase } from "../../../application/use-cases/GetPokemonByIdUseCase";
import { ListPokemonsUseCase } from "../../../application/use-cases/ListPokemonsUseCase";
import { UpdatePokemonUseCase } from "../../../application/use-cases/UpdatePokemonUseCase";
import { PokemonAlreadyExistsError } from "../../../domain/errors/PokemonAlreadyExistsError";
import { ResourceNotFoundError } from "../../../domain/errors/ResourceNotFoundError";
import type { Request, Response } from "express";

export class PokemonController {
  constructor(
    private readonly listPokemonsUseCase: ListPokemonsUseCase,
    private readonly getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private readonly createPokemonUseCase: CreatePokemonUseCase,
    private readonly updatePokemonUseCase: UpdatePokemonUseCase,
    private readonly deletePokemonUseCase: DeletePokemonUseCase,
  ) {}

  list = async (req: Request, res: Response): Promise<Response> => {
    const type = typeof req.query.type === "string" ? req.query.type : undefined;
    const pokemons = await this.listPokemonsUseCase.execute(type);

    return res.status(200).json(pokemons);
  };

    getById = async (req: Request<{ id: string }>,res: Response): Promise<Response> => {
    try {
      const pokemon = await this.getPokemonByIdUseCase.execute(req.params.id);

      return res.status(200).json(pokemon);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const pokemon = req.body as CreatePokemonDTO;

      await this.createPokemonUseCase.execute(pokemon);

      return res.status(201).json(pokemon);
    } catch (error) {
      if (error instanceof PokemonAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      }

      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  update = async (req: Request<{ id: string }>,res: Response): Promise<Response> => {
    try {
      const data = req.body as UpdatePokemonDTO;
      const pokemon = { id: req.params.id, ...data };

      await this.updatePokemonUseCase.execute(pokemon);

      return res.status(200).json(pokemon);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
      await this.deletePokemonUseCase.execute(req.params.id);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  };
}