import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
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
        image: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
        },
        album: {
            type: String,
            required: true,
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

export default mongoose.model("Photo", photoSchema);
