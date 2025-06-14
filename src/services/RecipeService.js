import Recipe from "../models/recipesModel.js";

export default {
  getAllRecipe(filter = {}) {
    let result = Recipe.find();

    if (filter.search) {
      result = result.find({
        title: { $regex: new RegExp(filter.search, "i") },
      });
    }

    return result;
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
  recommend(id, userId) {
    return Recipe.findByIdAndUpdate(id, { $push: { recommendList: userId } });
  },
};
