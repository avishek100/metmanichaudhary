import express from "express";
import {
    deleteUser,
    getAllUsers,
    getDashboardStats,
    toggleUserStatus,
    updateUserRole,
} from "../controllers/adminController.js";
import { adminMiddleware, authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.put("/users/:id/role", authMiddleware, adminMiddleware, updateUserRole);
router.patch("/users/:id/status", authMiddleware, adminMiddleware, toggleUserStatus);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
