import Recipe from "../models/recipesModel.js";

export default {
  getAllRecipe() {
    return Recipe.find();
  },
  findLastThree() {
    return Recipe.find().limit(3).sort({ _id: -1 });
  },

  create(userId, recipeData) {
    return Recipe.create({ ...recipeData, owner: userId });
  },

  getOne(recepiId) {
    return Recipe.findById(recepiId);
  },
  remove(id) {
    return Recipe.findByIdAndDelete(id);
  },
  update(recepiId, recipeData) {
    return Recipe.findByIdAndUpdate(recepiId, recipeData);
  },
};
