import { Router } from "express";
import recipeService from "../services/recipeService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  const recipe = await recipeService.findLastThree();

  res.render("home", { recipe });
});

export default homeController;
