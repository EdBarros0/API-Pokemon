import { Router } from "express";
import type { PokemonController } from "../controllers/PokemonController";

export function makePokemonRoutes(controller: PokemonController): Router {
  const router = Router();

  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
}