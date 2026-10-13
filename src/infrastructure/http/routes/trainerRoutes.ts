/**
 * @openapi
 * /api/v1/trainers:
 *   get:
 *     tags:
 *       - Trainers
 *     summary: Lista todos os treinadores
 *     responses:
 *       200:
 *         description: Lista de treinadores
 *   post:
 *     tags:
 *       - Trainers
 *     summary: Cadastra um treinador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ash Ketchum
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ash@example.com
 *               city:
 *                 type: string
 *                 example: Pallet
 *     responses:
 *       201:
 *         description: Treinador cadastrado
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 *
 * /api/v1/trainers/{id}:
 *   get:
 *     tags:
 *       - Trainers
 *     summary: Busca um treinador pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Treinador encontrado
 *       404:
 *         description: Treinador não encontrado
 *   put:
 *     tags:
 *       - Trainers
 *     summary: Atualiza um treinador
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
 *               - name
 *               - email
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ash Ketchum
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ash@example.com
 *               city:
 *                 type: string
 *                 example: Pallet
 *     responses:
 *       200:
 *         description: Treinador atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Treinador não encontrado
 */
import { Router } from 'express';
import type { TrainerController } from '@infrastructure/http/controllers/TrainerController';
import { validateRequest } from '@infrastructure/http/middlewares/validate-request';
import {
  createTrainerSchema,
  getTrainerByIdSchema,
  updateTrainerSchema,
} from '@infrastructure/http/schemas/trainer-schemas';

export function makeTrainerRoutes(controller: TrainerController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.get('/:id', validateRequest({ params: getTrainerByIdSchema }), controller.getById);
  router.post('/', validateRequest({ body: createTrainerSchema }), controller.create);
  router.put(
    '/:id',
    validateRequest({ params: getTrainerByIdSchema, body: updateTrainerSchema }),
    controller.update,
  );

  return router;
}
