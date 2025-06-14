import { Router } from "express";
import recipeService from "../services/recipeService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  const recipe = await recipeService.findLastThree();

  res.render("home", { recipe });
});

homeController.get("/search", async (req, res) => {
  const filter = req.query;

  const recipes = await recipeService.getAllRecipe(filter);

  res.render("search", { filter, recipes });
});

export default homeController;
