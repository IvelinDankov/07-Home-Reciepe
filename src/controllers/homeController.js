import { Router } from "express";
import RecipeService from "../services/RecipeService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  const recipe = await RecipeService.findLastThree();

  res.render("home", { recipe });
});

export default homeController;
