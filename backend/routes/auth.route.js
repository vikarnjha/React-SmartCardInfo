import express from "express";
import {
  register,
  login,
  verify,
  logout,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
// authRouter.post("/verify", verify);
authRouter.post("/logout", logout);
authRouter.get("/verify", protectedRoute, verify);

export {authRouter};
