import jwt from "jsonwebtoken";

import { AUTH_COOKIE, jwtSecret } from "../utils/userUtils.js";

function auth(req, res, next) {
  const token = req.cookies[AUTH_COOKIE];

  if (!token) {
    return next();
  }

  const { id, email, username } = jwt.verify(token, jwtSecret);

  req.user = {
    id,
    email,
    username,
    isAuthenticated: true,
  };

  res.locals.user = {
    id,
    email,
    username,
    isAuthenticated: true,
  };

  next();
}

function isAuth(req, res, next) {
  if (!req.user) {
    return res.redirect("/users/login");
  }

  next();
}

function guard(req, res, next) {
  if (req.user) {
    return res.redirect("/");
  }

  next();
}

export default {
  auth,
  isAuth,
  guard,
};
