import { Router } from "express";
import { register, login, profile } from "../controllers/authController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authRequired, profile);

export default router;
