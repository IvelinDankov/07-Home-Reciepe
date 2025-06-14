import { Schema, Types, model } from "mongoose";

const recipesSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  ingredients: {
    type: String,
    required: [true, "Ingredients is required"],
  },
  instructions: {
    type: String,
    required: [true, "Instructions is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  recommendList: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Recipe = model("Recipe", recipesSchema);

export default Recipe;
