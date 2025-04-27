import express from "express";
import {
  getme,
  login,
  logout,
  register,
} from "../components/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", isLoggedIn, logout);
router.get("/me", isLoggedIn, getme);

export default router;
