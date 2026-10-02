import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { upsertProfile } from "../modules/sync/sync.repository";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {

    console.log("🔥 NEXO AUTH MIDDLEWARE EJECUTADO");

    const header = req.headers.authorization;

    if (!header) {
        console.error("[AUTH] Missing Authorization header");

        res.status(401).json({
            error: "Missing Authorization header",
        });
        return;
    }

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        console.error("[AUTH] Invalid Authorization header");

        res.status(401).json({
            error: "Invalid Authorization header",
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

        console.log("[AUTH] JWT decoded:", {
            userId: decoded.userId,
            appId: decoded.appId,
            role: decoded.role,
            email: decoded.email,
            name: decoded.name,
        });

        req.context = {
            ...req.context,
            userId: decoded.userId,
            appId: decoded.appId,
            role: decoded.role,
            email: decoded.email,
            name: decoded.name,
        };

        next();
    } catch (error) {
        console.error("[AUTH] JWT ERROR:", error);

        res.status(401).json({
            error: "Invalid or expired token",
        });
    }
}