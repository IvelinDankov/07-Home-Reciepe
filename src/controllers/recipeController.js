import { Router } from "express";
import recipeService from "../services/recipeService.js";
import errorMsg from "../utils/errorMsg.js";

const recipeController = Router();

recipeController.get("/create", (req, res) => {
  res.render("recipe/create");
});
recipeController.post("/create", async (req, res) => {
  try {
    const recipeData = req.body;

    const userId = req.user.id;

    await recipeService.create(userId, recipeData);

    // TODO: Send to Catalog
    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);

    res.render("recipe/create", { error, data: recipeData });
  }
});

recipeController.get("/catalog", async (req, res) => {
  // TODO: Error handling
  const recipes = await recipeService.getAllRecipe();

  res.render("recipe/catalog", { recipes });
});
recipeController.get("/:recipeId/details", async (req, res) => {
  const recepiId = req.params.recipeId;
  const userId = req.user?.id;
  // TODO: Error handling
  const recipe = await recipeService.getOne(recepiId);

  const isOwner = String(recipe.owner) === userId;

  const hasRecommended = recipe.recommendList.find(
    (item) => item.id === userId
  );

  res.render("recipe/details", { recipe, isOwner, hasRecommended });
});

recipeController.get("/:recipeId/delete", async (req, res) => {
  const recepiId = req.params.recipeId;

  // TODO: Error handling and try catch
  await recipeService.remove(recepiId);

  res.redirect("/recipes/catalog");
});
recipeController.get("/:recipeId/edit", async (req, res) => {
  const recepiId = req.params.recipeId;

  const recipe = await recipeService.getOne(recepiId);

  res.render("recipe/edit", { recipe });
});
recipeController.post("/:recipeId/edit", async (req, res) => {
  const recepiId = req.params.recipeId;
  const recipeData = req.body;

  try {
    // TODO: Error handling and try catch
    await recipeService.update(recepiId, recipeData);

    res.redirect("/recipes/catalog");
  } catch (err) {
    const error = errorMsg(err);
    res.render("recipe/edit", { error, data: recipeData });
  }
});

export default recipeController;
