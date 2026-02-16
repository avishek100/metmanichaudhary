import News from "../models/News.js";
import Photo from "../models/Photo.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalNews = await News.countDocuments();
        const totalPhotos = await Photo.countDocuments();
        const totalVideos = await Video.countDocuments();

        const publishedNews = await News.countDocuments({ status: "published" });
        const publishedPhotos = await Photo.countDocuments({ status: "published" });
        const publishedVideos = await Video.countDocuments({ status: "published" });

        const totalViews = await Promise.all([
            News.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
            Photo.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
            Video.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
        ]);

        const recentNews = await News.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalUsers,
            totalNews,
            totalPhotos,
            totalVideos,
            publishedNews,
            publishedPhotos,
            publishedVideos,
            totalNewsViews: totalViews[0][0]?.total || 0,
            totalPhotoViews: totalViews[1][0]?.total || 0,
            totalVideoViews: totalViews[2][0]?.total || 0,
            recentNews,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find()
            .select("-password")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await User.countDocuments();

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select(
            "-password"
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User role updated", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isActive = !user.isActive;
        await user.save();
        res.json({ message: "User status updated", user: user.select("-password") });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
