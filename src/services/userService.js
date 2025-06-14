import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/userUtils.js";

export default {
  async register(name, email, password) {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exist!");
    }

    return User.create({
      name,
      email,
      password,
    });
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User or email are not Valid");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("User or email are not Valid");
    }

    const payload = {
      id: user.id,
      username: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "4h" });

    return token;
  },
};
