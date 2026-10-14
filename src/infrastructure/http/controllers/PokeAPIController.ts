import type { Request, Response } from 'express';
import type { FindPokemonUseCase } from '@application/use-cases/findPokemon';

export class PokeAPIController {
  constructor(private readonly findPokemonUseCase: FindPokemonUseCase) {}

  getByIdOrName = async (
    req: Request<{ idOrName: string }>,
    res: Response,
  ): Promise<Response> => {
    const pokemon = await this.findPokemonUseCase.execute(req.params.idOrName);
    return res.status(200).json(pokemon);
  };
}
