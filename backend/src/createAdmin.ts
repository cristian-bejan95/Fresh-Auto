import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "./models/Admin";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL?.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Adminul există deja");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD as string,
      10,
    );

    await Admin.create({
      email: process.env.ADMIN_EMAIL?.toLowerCase(),
      password: hashedPassword,
    });

    console.log("Admin creat cu succes");
    process.exit(0);
  } catch (error) {
    console.error("Eroare creare admin:", error);
    process.exit(1);
  }
}

createAdmin();
