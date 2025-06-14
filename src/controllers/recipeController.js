import { Router } from "express";
import RecipeService from "../services/RecipeService.js";

const recipeController = Router();

recipeController.get("/create", (req, res) => {
  res.render("recipe/create");
});
recipeController.post("/create", async (req, res) => {
  const recipeData = req.body;

  const userId = req.user.id;

  await RecipeService.create(userId, recipeData);

  res.render("recipe/create");
});

export default recipeController;
