import { Router } from "express";
import userService from "../services/userService.js";
import { AUTH_COOKIE } from "../utils/userUtils.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import errorMsg from "../utils/errorMsg.js";

const userController = Router();

userController.get("/register", authMiddleware.guard, (req, res) => {
  res.render("user/register");
});

userController.post("/register", authMiddleware.guard, async (req, res) => {
  const { username, email, password, rePass } = req.body;

  try {
    if (password !== rePass) {
      throw new Error("Password mismach!");
    }

    await userService.register(username, email, password, rePass);

    // const token = await userService.login(email, password);

    // res.cookie(AUTH_COOKIE, token);

    res.redirect("/users/login");
  } catch (err) {
    const error = errorMsg(err);

    res.render("user/register", { username, email, error });
  }
});

userController.get("/login", authMiddleware.guard, (req, res) => {
  res.render("user/login");
});
userController.post("/login", authMiddleware.guard, async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.cookie(AUTH_COOKIE, token);

    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);
    res.render("user/login", { email, error });
  }
});

userController.get("/logout", authMiddleware.auth, (req, res) => {
  res.clearCookie(AUTH_COOKIE);

  res.redirect("/");
});

export default userController;
