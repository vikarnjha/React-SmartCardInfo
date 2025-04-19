import express from "express";
import {
  register,
  login,
  verify,
  logout,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verify", verify);
authRouter.post("/logout", logout);

export default authRouter;
