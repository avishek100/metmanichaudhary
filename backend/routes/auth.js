import express from "express";
import { getCurrentUser, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Registration endpoint disabled: not referenced by frontend (admin users are created via script).
// If you want to re-enable public registration, uncomment the line below.
// router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
