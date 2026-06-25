import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { upsertProfile } from "../modules/sync/sync.repository";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization;

  if (!header) {
    res.status(401).json({
      error: "Missing Authorization header",
    });
    return;
  }

  const token = header.split(" ")[1];

  if (!token) {
    res.status(401).json({
      error: "Missing token",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as {
      userId: number;
      appId: number;
      role?: string;
      email?: string;
      name?: string;
    };

    const profile =
      await upsertProfile(decoded.userId, decoded.name!, decoded.email!);

    console.log("Profile created/retrieved:", profile);

    req.context = {
      ...req.context,
      userId: decoded.userId,
      profileId: profile.id,
      appId: decoded.appId,
      role: decoded.role,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}