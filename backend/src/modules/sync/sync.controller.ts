import { Request, Response } from "express";
import { syncNexoUser } from "./sync.service";

export async function syncController(
    req: Request,
    res: Response,
) {
    try {
        const tenantUserId = req.context?.userId;
        const email = req.context?.email;
        const name = req.context?.name;

        if (tenantUserId == null) {
            return res.status(401).json({
                error: "User not authenticated",
            });
        }

        if (!email || !name) {
            return res.status(400).json({
                error: "Missing email or name in token",
            });
        }

        const profile = await syncNexoUser(
            tenantUserId,
            name,
            email,
        );

        return res.status(200).json({
            success: true,
            profile,
        });
    } catch (error) {
        console.error("SENTINEL SYNC ERROR", error);

        return res.status(500).json({
            error: "Failed to sync Sentinel profile",
        });
    }
}