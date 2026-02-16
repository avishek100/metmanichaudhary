import Video from "../models/Video.js";

export const createVideo = async (req, res) => {
    try {
        const { title, titleHindi, description, descriptionHindi, videoUrl, duration, category, status, tags } = req.body;
        const videoFile = req.file?.path;

        if (!title || (!videoUrl && !videoFile)) {
            return res.status(400).json({ message: "Title and video URL or file are required" });
        }

        const video = new Video({
            title,
            titleHindi,
            description,
            descriptionHindi,
            videoUrl: videoFile || videoUrl,
            videoFile: videoFile || null,
            duration,
            category,
            author: req.user.id,
            status,
            publishedAt: status === "published" ? new Date() : null,
            tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        });

        await video.save();
        await video.populate("author", "name email");

        res.status(201).json({ message: "Video created successfully", video });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideos = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, status, featured } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (featured === "true") query.featured = true;

        const videos = await Video.find(query)
            .populate("author", "name email")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await Video.countDocuments(query);

        res.json({
            videos,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate("author", "name email");
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        video.views += 1;
        await video.save();
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateVideo = async (req, res) => {
    try {
        const { title, titleHindi, description, descriptionHindi, videoUrl, duration, category, status, tags } = req.body;
        const videoFile = req.file?.path;
        const update = { title, titleHindi, description, descriptionHindi, duration, category, status };

        if (videoFile) {
            update.videoUrl = videoFile;
            update.videoFile = videoFile;
        } else if (videoUrl) {
            update.videoUrl = videoUrl;
        }

        if (tags) {
            update.tags = tags.split(",").map((t) => t.trim());
        }

        if (status === "published") {
            update.publishedAt = new Date();
        }

        const video = await Video.findByIdAndUpdate(req.params.id, update, { new: true }).populate(
            "author",
            "name email"
        );

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.json({ message: "Video updated successfully", video });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleFeaturedVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        video.featured = !video.featured;
        await video.save();
        res.json({ message: "Featured status updated", video });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
