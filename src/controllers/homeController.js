import { Router } from "express";
import recipeService from "../services/recipeService.js";
import errorMsg from "../utils/errorMsg.js";

const homeController = Router();

homeController.get("/", async (req, res) => {

  try {
    const recipe = await recipeService.findLastThree();
  
    res.render("home", { recipe });
    
  } catch (err) {
    const error = errorMsg(err)
    res.render('home', {error})
  }
});

homeController.get("/search", async (req, res) => {
  const filter = req.query;

  try {
    const recipes = await recipeService.getAllRecipe(filter);

    res.render("search", { filter, recipes });
  } catch (err) {
    const error = errorMsg(err)
    res.render('search', {error})
  }
});

export default homeController;
