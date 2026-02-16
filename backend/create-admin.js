import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import User from "./models/User.js";

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Admin details
        const adminData = {
            name: "Admin User",
            email: "admin@gmail.com",
            password: "Admin1234", // Change this to your desired password
            role: "admin",
            isActive: true,
        };

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log("❌ Admin user already exists with this email");
            await mongoose.connection.close();
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Create admin
        const admin = new User({
            name: adminData.name,
            email: adminData.email,
            password: hashedPassword,
            role: "admin",
            isActive: true,
        });

        await admin.save();

        console.log("✅ Admin user created successfully!");
        console.log("📧 Email:", adminData.email);
        console.log("🔑 Password:", adminData.password);
        console.log("\n⚠️  Please change your password after first login!");

        await mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error creating admin:", error.message);
        process.exit(1);
    }
}

createAdmin();
