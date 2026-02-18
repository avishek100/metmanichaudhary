export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation error",
            errors: Object.values(err.errors).map((e) => e.message),
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
            field: field,
        });
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            message: "Invalid token",
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            message: "Token expired",
        });
    }

    // Cast error (invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format",
        });
    }

    // Custom error with status code
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            message: err.message || "An error occurred",
        });
    }

    // Default server error
    res.status(500).json({
        message: process.env.NODE_ENV === "production" 
            ? "Internal server error" 
            : err.message || "Internal server error",
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
};
