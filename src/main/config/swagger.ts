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
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Pokemon: {
          type: 'object',
          required: ['id', 'name', 'type', 'hp', 'attack', 'defense'],
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
              example: 'Electric',
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
          },
        },
      },
    },
  },
  apis: [routeFiles],
});
