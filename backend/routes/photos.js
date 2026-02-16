import express from "express";
import {
    createPhoto,
    deletePhoto,
    getAlbums,
    getPhotoById,
    getPhotos,
    toggleFeaturedPhoto,
    updatePhoto,
} from "../controllers/photoController.js";
import { authMiddleware, editorMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", authMiddleware, editorMiddleware, upload.single("image"), createPhoto);
router.get("/", getPhotos);
router.get("/albums", getAlbums);
router.get("/:id", getPhotoById);
router.put("/:id", authMiddleware, editorMiddleware, upload.single("image"), updatePhoto);
router.delete("/:id", authMiddleware, editorMiddleware, deletePhoto);
router.patch("/:id/featured", authMiddleware, editorMiddleware, toggleFeaturedPhoto);

export default router;
