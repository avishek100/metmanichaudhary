import Photo from "../models/Photo.js";

export const createPhoto = async (req, res) => {
    try {
        const { title, titleHindi, description, descriptionHindi, album, status, tags } = req.body;
        const imageUrl = req.file?.path;

        if (!title || !imageUrl || !album) {
            return res.status(400).json({ message: "Title, image, and album are required" });
        }

        const photo = new Photo({
            title,
            titleHindi,
            description,
            descriptionHindi,
            image: imageUrl,
            album,
            author: req.user.id,
            status,
            publishedAt: status === "published" ? new Date() : null,
            tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        });

        await photo.save();
        await photo.populate("author", "name email");

        res.status(201).json({ message: "Photo created successfully", photo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPhotos = async (req, res) => {
    try {
        const { page = 1, limit = 20, album, status, featured } = req.query;
        const query = {};

        if (album) query.album = album;
        if (status) query.status = status;
        if (featured === "true") query.featured = true;

        const photos = await Photo.find(query)
            .populate("author", "name email")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await Photo.countDocuments(query);

        res.json({
            photos,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id).populate("author", "name email");
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        photo.views += 1;
        await photo.save();
        res.json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePhoto = async (req, res) => {
    try {
        const { title, titleHindi, description, descriptionHindi, album, status, tags } = req.body;
        const update = { title, titleHindi, description, descriptionHindi, album, status };

        if (req.file) {
            update.image = req.file.path;
        }

        if (tags) {
            update.tags = tags.split(",").map((t) => t.trim());
        }

        if (status === "published") {
            update.publishedAt = new Date();
        }

        const photo = await Photo.findByIdAndUpdate(req.params.id, update, { new: true }).populate(
            "author",
            "name email"
        );

        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        res.json({ message: "Photo updated successfully", photo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        res.json({ message: "Photo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleFeaturedPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        photo.featured = !photo.featured;
        await photo.save();
        res.json({ message: "Featured status updated", photo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAlbums = async (req, res) => {
    try {
        const albums = await Photo.distinct("album");
        res.json({ albums });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
