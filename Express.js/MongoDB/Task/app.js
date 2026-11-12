import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

app.use(express.json());

async function connectMongoDb() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
}

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from .env");
        }

        await connectMongoDb();

        app.listen(3000, () => {
            console.log("Server is running at 3000");
        });

    } catch (error) {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();