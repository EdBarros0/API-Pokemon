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
 * /api/v1/pokemons/search:
 *   get:
 *     tags:
 *       - Pokemons
 *     summary: Busca Pokémons por parte do nome, sem diferenciar maiúsculas
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: pika
 *     responses:
 *       200:
 *         description: Pokémons encontrados
 *       400:
 *         description: Parâmetro name não informado
 *
 * /api/v1/pokemons/count:
 *   get:
 *     tags:
 *       - Pokemons
 *     summary: Conta o total de Pokémons cadastrados
 *     responses:
 *       200:
 *         description: Total de Pokémons
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
 *
 * /api/v1/pokemons/{id}/level:
 *   patch:
 *     tags:
 *       - Pokemons
 *     summary: Atualiza o nível de um Pokémon
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
 *             type: object
 *             required:
 *               - newLevel
 *             properties:
 *               newLevel:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Nível atualizado
 *       400:
 *         description: Nível inválido
 *       404:
 *         description: Pokémon não encontrado
 */
import { Router } from 'express';
import type { PokemonController } from '@infrastructure/http/controllers/PokemonController';

export function makePokemonRoutes(controller: PokemonController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.get('/search', controller.searchByName);
  router.get('/count', controller.count);
  router.get('/:id', controller.getById);
  router.patch('/:id/level', controller.updateLevel);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
}
