import { Router } from "express";
import { signup } from "../controllers/authcontrollers.js";
import { login } from "../controllers/authcontrollers.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/signup", validateRegister, signup);
router.post("/login", validateLogin, login);

export default router;
