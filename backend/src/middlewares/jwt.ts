import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET) as {
    userId: number;
    appId: number;
  };
};