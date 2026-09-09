import express from 'express';
import { makePokemonRoutes } from '@infrastructure/http/routes/pokemonRoutes';
import { makePokemonController } from '@main/factories/makePokemonController';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@main/config/swagger';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const pokemonController = makePokemonController();
const pokemonRoutes = makePokemonRoutes(pokemonController);

app.use('/api/v1/pokemons', pokemonRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
