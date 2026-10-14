import { existsSync } from 'node:fs';
import { join } from 'node:path';
import swaggerJSDoc from 'swagger-jsdoc';

const sourceRoutesDirectory = join(
  process.cwd(),
  'src/infrastructure/http/routes',
);
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
          required: ['name'],
          properties: {
            name: { type: 'string', minLength: 2, example: 'Pikachu' },
            level: { type: 'integer', minimum: 1, maximum: 100, default: 1 },
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
            spriteUrl: { type: 'string', nullable: true },
            baseExperience: { type: 'integer', nullable: true, example: 112 },
            height: { type: 'integer', nullable: true, example: 4 },
            weight: { type: 'integer', nullable: true, example: 60 },
          },
        },
      },
    },
  },
  apis: [routeFiles],
});
