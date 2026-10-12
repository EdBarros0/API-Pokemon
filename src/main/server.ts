import express from 'express';
import { makePokemonRoutes } from '@infrastructure/http/routes/pokemonRoutes';
import { makePokemonController } from '@main/factories/makePokemonController';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@main/config/swagger';
import { errorHandler } from '@infrastructure/http/middlewares/errorHandler';
import { makeTrainerRoutes } from '@infrastructure/http/routes/trainerRoutes';
import { makeTrainerController } from '@main/factories/makeTrainerController';

const app = express();

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = 3000;

const pokemonController = makePokemonController();
const pokemonRoutes = makePokemonRoutes(pokemonController);
const trainerController = makeTrainerController();
const trainerRoutes = makeTrainerRoutes(trainerController);

app.use('/api/v1/pokemons', pokemonRoutes);
app.use('/api/v1/trainers', trainerRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 [server]: Servidor rodando em http://localhost:${port}`);
  console.log(
    `📖 [docs]: Swagger rodando em http://localhost:${port}/api/docs`,
  );
});
