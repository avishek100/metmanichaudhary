import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
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
            required: true,
        },
        descriptionHindi: {
            type: String,
        },
        content: {
            type: String,
        },
        contentHindi: {
            type: String,
        },
        image: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: String,
            enum: ["announcement", "event", "update", "other"],
            default: "update",
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
    },
    { timestamps: true }
);

export default mongoose.model("News", newsSchema);
