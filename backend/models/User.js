import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /.+\@.+\..+/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "editor", "user"],
            default: "editor",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: Date,
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
