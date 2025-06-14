import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minLength: [2, "Min Length is 2 characters"],
    maxlength: [20, "Max allowed character are 20"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    minLength: [10, "Email Must be at least 10 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [4, "Password must be at least 4 charachers."],
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
