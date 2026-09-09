import swaggerJSDoc from 'swagger-jsdoc';

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
          },
        },
      },
    },
  },
  apis: ['./src/infrastructure/http/routes/*.ts'],
});
