import News from "../models/News.js";

export const createNews = async (req, res) => {
    try {
        const { title, titleHindi, description, descriptionHindi, content, contentHindi, category, status } = req.body;
        const imageUrl = req.file?.path;

        if (!title || !description || !imageUrl) {
            return res.status(400).json({ message: "Title, description, and image are required" });
        }

        const news = new News({
            title,
            titleHindi,
            description,
            descriptionHindi,
            content,
            contentHindi,
            image: imageUrl,
            author: req.user.id,
            category,
            status,
            publishedAt: status === "published" ? new Date() : null,
        });

        await news.save();
        await news.populate("author", "name email");

        res.status(201).json({ message: "News created successfully", news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNews = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, category } = req.query;
        const query = {};

        if (status) query.status = status;
        if (category) query.category = category;

        const news = await News.find(query)
            .populate("author", "name email")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await News.countDocuments(query);

        res.json({
            news,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate("author", "name email");
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        news.views += 1;
        await news.save();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateNews = async (req, res) => {
    try {
        const { title, titleHindi, description, descriptionHindi, content, contentHindi, category, status } = req.body;
        const update = { title, titleHindi, description, descriptionHindi, content, contentHindi, category, status };

        if (req.file) {
            update.image = req.file.path;
        }

        if (status === "published" && !req.body.publishedAt) {
            update.publishedAt = new Date();
        }

        const news = await News.findByIdAndUpdate(req.params.id, update, { new: true }).populate(
            "author",
            "name email"
        );

        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }

        res.json({ message: "News updated successfully", news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleFeatured = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        news.featured = !news.featured;
        await news.save();
        res.json({ message: "Featured status updated", news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
