"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const sourceRoutesDirectory = (0, node_path_1.join)(process.cwd(), 'src/infrastructure/http/routes');
const routeFiles = (0, node_fs_1.existsSync)(sourceRoutesDirectory)
    ? (0, node_path_1.join)(sourceRoutesDirectory, '*.ts')
    : (0, node_path_1.join)(process.cwd(), 'dist/infrastructure/http/routes/*.js');
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
//# sourceMappingURL=swagger.js.map