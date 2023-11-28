import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect('mongodb+srv://sb7325:OJizQxY4hFUI9Dou@cluster0.yfhgld9.mongodb.net/?retryWrites=true&w=majority');
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
