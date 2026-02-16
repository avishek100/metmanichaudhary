import express from "express";
import {
    createVideo,
    deleteVideo,
    getVideoById,
    getVideos,
    toggleFeaturedVideo,
    updateVideo,
} from "../controllers/videoController.js";
import { authMiddleware, editorMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", authMiddleware, editorMiddleware, upload.single("video"), createVideo);
router.get("/", getVideos);
router.get("/:id", getVideoById);
router.put("/:id", authMiddleware, editorMiddleware, upload.single("video"), updateVideo);
router.delete("/:id", authMiddleware, editorMiddleware, deleteVideo);
router.patch("/:id/featured", authMiddleware, editorMiddleware, toggleFeaturedVideo);

export default router;
