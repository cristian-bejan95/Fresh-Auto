import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin";
import { generateToken } from "../utils/generateToken";

export async function loginAdmin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email și parola sunt obligatorii",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({
        message: "Email sau parolă greșită",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Email sau parolă greșită",
      });
    }

    const token = generateToken(String(admin._id), admin.email);

    return res.status(200).json({
      message: "Login reușit",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Eroare login:", error);
    return res.status(500).json({
      message: "Eroare server",
    });
  }
}
