import Recipe from "../models/recipesModel.js";

export default {
  getAllRecipe() {
    return Recipe.find();
  },
  findLastThree() {
    return Recipe.find().limit(3);
  },
};
