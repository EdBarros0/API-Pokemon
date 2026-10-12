"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerSpec = (0, swagger_jsdoc_1.default)({
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
//# sourceMappingURL=swagger.js.map