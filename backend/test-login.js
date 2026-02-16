import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import User from "./models/User.js";

async function testLogin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const user = await User.findOne({ email: "admin@example.com" });

        if (!user) {
            console.log("❌ User not found! Create admin first:");
            console.log("   Run: node create-admin.js");
            await mongoose.connection.close();
            return;
        }

        console.log("✅ User found!");
        console.log("   Email:", user.email);
        console.log("   Role:", user.role);
        console.log("   Active:", user.isActive);

        // Test password
        const password = "Admin@123456";
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            console.log("✅ Password matches!");
        } else {
            console.log("❌ Password does NOT match!");
            console.log("   Make sure you're using the correct password");
        }

        await mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

testLogin();
