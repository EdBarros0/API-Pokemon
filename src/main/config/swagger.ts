import { existsSync } from 'node:fs';
import { join } from 'node:path';
import swaggerJSDoc from 'swagger-jsdoc';

const sourceRoutesDirectory = join(process.cwd(), 'src/infrastructure/http/routes');
const routeFiles = existsSync(sourceRoutesDirectory)
  ? join(sourceRoutesDirectory, '*.ts')
  : join(process.cwd(), 'dist/infrastructure/http/routes/*.js');

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'PokéManager API',
      version: '1.0.0',
      description: 'API REST para gerenciamento de Pokémons.',
    },
    servers: [
      {
        url: '/',
        description: 'Mesma origem da documentação',
      },
    ],
    components: {
      schemas: {
        CreatePokemon: {
          type: 'object',
          required: ['id', 'name', 'type', 'hp', 'attack', 'defense', 'level'],
          properties: {
            id: { type: 'string', example: '25' },
            name: { type: 'string', minLength: 2, example: 'Pikachu' },
            type: {
              type: 'string',
              enum: ['FIRE', 'WATER', 'GRASS', 'ELECTRIC', 'POISON', 'FLYING'],
              example: 'ELECTRIC',
            },
            hp: { type: 'integer', minimum: 0, example: 35 },
            attack: { type: 'integer', minimum: 0, example: 55 },
            defense: { type: 'integer', minimum: 0, example: 40 },
            level: { type: 'integer', minimum: 1, maximum: 100, example: 10 },
            trainerId: { type: 'string', format: 'uuid', nullable: true },
          },
        },
        Pokemon: {
          type: 'object',
          required: ['id', 'name', 'type', 'hp', 'attack', 'defense', 'level'],
          properties: {
            id: {
              type: 'string',
              example: '25',
            },
            name: {
              type: 'string',
              example: 'Pikachu',
            },
            type: {
              type: 'string',
              enum: ['FIRE', 'WATER', 'GRASS', 'ELECTRIC', 'POISON', 'FLYING'],
              example: 'ELECTRIC',
            },
            hp: {
              type: 'number',
              example: 35,
            },
            attack: {
              type: 'number',
              example: 55,
            },
            defense: {
              type: 'number',
              example: 40,
            },
            level: {
              type: 'integer',
              example: 10,
            },
            trainerId: { type: 'string', format: 'uuid', nullable: true },
          },
        },
      },
    },
  },
  apis: [routeFiles],
});
