import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

type AuthPayload = jwt.JwtPayload & {
    userId: number;
    appId: number;
    role?: string;
    email?: string;
    name?: string;
};

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (!JWT_SECRET) {
        res.status(500).json({
            error: "Authentication is not configured",
        });
        return;
    }

    const header = req.headers.authorization;
    const match = header?.match(/^Bearer\s+(.+)$/i);

    if (!match) {
        res.status(401).json({
            error: "Missing or invalid Authorization header",
        });
        return;
    }

    let decoded: AuthPayload;

    try {
        decoded = jwt.verify(
            match[1],
            JWT_SECRET
        ) as AuthPayload;

        if (
            typeof decoded.userId !== "number" ||
            typeof decoded.appId !== "number"
        ) {
            res.status(401).json({
                error: "Invalid token payload",
            });
            return;
        }
    } catch (error) {
        console.error("JWT validation failed:", error);

        res.status(401).json({
            error: "Invalid or expired token",
        });
        return;
    }

    req.context = {
        ...req.context,
        userId: decoded.userId,
        appId: decoded.appId,
        role: decoded.role,
        email: decoded.email,
        name: decoded.name,
    };

    next();
}