import express from "express";
import { makePokemonRoutes } from "../infrastructure/http/routes/pokemonRoutes";
import { makePokemonController } from "./factories/makePokemonController";

const app = express();
const port = 3000;

app.use(express.json());

const pokemonController = makePokemonController();
const pokemonRoutes = makePokemonRoutes(pokemonController);

app.use("/api/v1/pokemons", pokemonRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});