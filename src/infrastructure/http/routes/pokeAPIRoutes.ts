import { Router } from 'express';
import type { PokeAPIController } from '@infrastructure/http/controllers/PokeAPIController';
import { validateRequest } from '@infrastructure/http/middlewares/validate-request';
import { getPokemonByIdSchema } from '@infrastructure/http/schemas/pokeAPI-schema';

export function makePokeAPIRoutes(controller: PokeAPIController): Router {
  const router = Router();

  /**
   * @openapi
   * /api/v1/pokeapi/pokemons/{idOrName}:
   *   get:
   *     tags:
   *       - PokéAPI
   *     summary: Busca um Pokémon na PokéAPI por ID ou nome
   *     parameters:
   *       - in: path
   *         name: idOrName
   *         required: true
   *         schema:
   *           type: string
   *         example: pikachu
   *     responses:
   *       200:
   *         description: Detalhes do Pokémon
   *       400:
   *         description: ID ou nome inválido
   *       404:
   *         description: Pokémon não encontrado
   *       502:
   *         description: Falha ao consultar a PokéAPI
   *       504:
   *         description: Timeout ao consultar a PokéAPI
   */
  router.get(
    '/pokemons/:idOrName',
    validateRequest({ params: getPokemonByIdSchema }),
    controller.getByIdOrName,
  );

  return router;
}
