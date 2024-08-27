import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const databaseString = process.env.DATABASE_URL || "";

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect(databaseString);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
