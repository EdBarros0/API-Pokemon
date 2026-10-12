"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pokemonRoutes_1 = require("../infrastructure/http/routes/pokemonRoutes.js");
const makePokemonController_1 = require("./factories/makePokemonController.js");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger.js");
const errorHandler_1 = require("../infrastructure/http/middlewares/errorHandler.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
const port = 3000;
const pokemonController = (0, makePokemonController_1.makePokemonController)();
const pokemonRoutes = (0, pokemonRoutes_1.makePokemonRoutes)(pokemonController);
app.use('/api/v1/pokemons', pokemonRoutes);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`🚀 [server]: Servidor rodando em http://localhost:${port}`);
    console.log(`📖 [docs]: Swagger rodando em http://localhost:${port}/api/docs`);
});
//# sourceMappingURL=server.js.map