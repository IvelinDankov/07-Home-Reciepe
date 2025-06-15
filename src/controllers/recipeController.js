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

    res.redirect("/recepies/catalog");
  } catch (err) {
    const error = errorMsg(err);

    res.render("recipe/create", { error, data: recipeData });
  }
});

recipeController.get("/catalog", async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipe();

    res.render("recipe/catalog", { recipes });
  } catch (err) {
    const error = errorMsg(err);
    res.render("recipe/catalog", { error });
  }
});

recipeController.get("/:recipeId/recommend", async (req, res) => {
  const recepiId = req.params.recipeId;
  const userId = req.user?.id;

  try {
    const recipe = await recipeService.getOne(recepiId);

    const hasRecommended = recipe.recommendList.includes(userId);

    if (hasRecommended) {
      throw new Error("You has already like it!");
    }

    await recipeService.recommend(recepiId, userId);

    res.redirect(`/recipes/${recepiId}/details`);
  } catch (err) {
    const error = errorMsg(err);
    res.render("recipe/catalog", { error });
  }
});

recipeController.get("/:recipeId/details", async (req, res) => {
  const recepiId = req.params.recipeId;
  const userId = req.user?.id;

  try {
    const recipe = await recipeService.getOne(recepiId);

    const isOwner = String(recipe.owner) === userId;

    const hasRecommended = recipe.recommendList.find(
      (id) => String(id) === userId
    );

    const likedPeople = recipe.recommendList.length;

    res.render("recipe/details", {
      recipe,
      isOwner,
      hasRecommended,
      likedPeople,
    });
  } catch (err) {
    const error = errorMsg(err);
    res.render("recipe/catalog", { error });
  }
});

recipeController.get("/:recipeId/delete", async (req, res) => {
  const recepiId = req.params.recipeId;

  try {
    await recipeService.remove(recepiId);

    res.redirect("/recipes/catalog");
  } catch (err) {
    const error = errorMsg(err);
    res.render("recipe/catalog", { error });
  }
});
recipeController.get("/:recipeId/edit", async (req, res) => {
  const recepiId = req.params.recipeId;

  try {
    const recipe = await recipeService.getOne(recepiId);

    res.render("recipe/edit", { recipe });
  } catch (err) {
    const error = errorMsg(err);
    res.render("recipe/catalog", { error });
  }
});
recipeController.post("/:recipeId/edit", async (req, res) => {
  const recepiId = req.params.recipeId;
  const recipeData = req.body;

  try {
    await recipeService.update(recepiId, recipeData);

    res.redirect("/recipes/catalog");
  } catch (err) {
    const error = errorMsg(err);
    res.render("recipe/edit", { error, data: recipeData });
  }
});

export default recipeController;
