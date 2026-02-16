import express from "express";
import {
    createNews,
    deleteNews,
    getNews,
    getNewsById,
    toggleFeatured,
    updateNews,
} from "../controllers/newsController.js";
import { authMiddleware, editorMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", authMiddleware, editorMiddleware, upload.single("image"), createNews);
router.get("/", getNews);
router.get("/:id", getNewsById);
router.put("/:id", authMiddleware, editorMiddleware, upload.single("image"), updateNews);
router.delete("/:id", authMiddleware, editorMiddleware, deleteNews);
router.patch("/:id/featured", authMiddleware, editorMiddleware, toggleFeatured);

export default router;
