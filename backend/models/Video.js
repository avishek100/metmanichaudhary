import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        titleHindi: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
        },
        descriptionHindi: {
            type: String,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        videoFile: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        duration: Number,
        category: {
            type: String,
            enum: ["event", "tutorial", "news", "other"],
            default: "other",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        publishedAt: Date,
        views: {
            type: Number,
            default: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        tags: [String],
    },
    { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
