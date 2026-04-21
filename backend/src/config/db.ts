import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB Atlas conectat");
  } catch (error) {
    console.error("Eroare conectare MongoDB Atlas:", error);
    process.exit(1);
  }
}
