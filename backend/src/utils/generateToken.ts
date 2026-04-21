import jwt from "jsonwebtoken";

export function generateToken(id: string, email: string) {
  return jwt.sign({ id, email }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}
