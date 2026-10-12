import { CreatePokemonUseCase } from '../../../application/use-cases/CreatePokemonUseCase.js';
import { DeletePokemonUseCase } from '../../../application/use-cases/DeletePokemonUseCase.js';
import { GetPokemonByIdUseCase } from '../../../application/use-cases/GetPokemonByIdUseCase.js';
import { ListPokemonsUseCase } from '../../../application/use-cases/ListPokemonsUseCase.js';
import { UpdatePokemonUseCase } from '../../../application/use-cases/UpdatePokemonUseCase.js';
import type { Request, Response } from 'express';
export declare class PokemonController {
    private readonly listPokemonsUseCase;
    private readonly getPokemonByIdUseCase;
    private readonly createPokemonUseCase;
    private readonly updatePokemonUseCase;
    private readonly deletePokemonUseCase;
    constructor(listPokemonsUseCase: ListPokemonsUseCase, getPokemonByIdUseCase: GetPokemonByIdUseCase, createPokemonUseCase: CreatePokemonUseCase, updatePokemonUseCase: UpdatePokemonUseCase, deletePokemonUseCase: DeletePokemonUseCase);
    list: (req: Request, res: Response) => Promise<Response>;
    getById: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response>;
    create: (req: Request, res: Response) => Promise<Response>;
    update: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response>;
    delete: (req: Request<{
        id: string;
    }>, res: Response) => Promise<Response>;
}
//# sourceMappingURL=PokemonController.d.ts.map