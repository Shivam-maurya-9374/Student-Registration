import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 🔗 MongoDB connection string (Local or Atlas)
    await mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
