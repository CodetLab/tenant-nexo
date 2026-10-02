import { Request, Response } from "express";
import * as service from "./organization.service";

export async function list(
    req: Request,
    res: Response
) {
    try {
        const tenantUserId = req.context?.userId;

        if (!tenantUserId) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const organizations =
            await service.list(tenantUserId);

        return res.json(organizations);
    } catch (error) {
        console.error("[ORGANIZATIONS]", error);

        return res.status(500).json({
            error: "Failed to fetch organizations",
        });
    }
}