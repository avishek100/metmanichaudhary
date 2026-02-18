import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verify user still exists and is active
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        if (!user.isActive) {
            return res.status(403).json({ message: "Account is deactivated" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: "Authentication error" });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

export const editorMiddleware = (req, res, next) => {
    if (req.user?.role === "user") {
        return res.status(403).json({ message: "Editor or Admin access required" });
    }
    next();
};
