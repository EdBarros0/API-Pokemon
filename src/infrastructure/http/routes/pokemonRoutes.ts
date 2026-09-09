/**
 * @openapi
 * /api/v1/pokemons:
 *   get:
 *     tags:
 *       - Pokemons
 *     summary: Lista todos os Pokémons
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtra Pokémons por tipo
 *     responses:
 *       200:
 *         description: Lista de Pokémons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Pokemon"
 *   post:
 *     tags:
 *       - Pokemons
 *     summary: Cria um Pokémon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pokemon"
 *     responses:
 *       201:
 *         description: Pokémon criado
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: ID já cadastrado
 *
 * /api/v1/pokemons/{id}:
 *   get:
 *     tags:
 *       - Pokemons
 *     summary: Busca um Pokémon por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pokémon encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pokemon"
 *       404:
 *         description: Pokémon não encontrado
 *   put:
 *     tags:
 *       - Pokemons
 *     summary: Atualiza um Pokémon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pokemon"
 *     responses:
 *       200:
 *         description: Pokémon atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Pokémon não encontrado
 *   delete:
 *     tags:
 *       - Pokemons
 *     summary: Remove um Pokémon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pokémon removido
 *       404:
 *         description: Pokémon não encontrado
 */
import { Router } from 'express';
import type { PokemonController } from '@infrastructure/http/controllers/PokemonController';

export function makePokemonRoutes(controller: PokemonController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
}
