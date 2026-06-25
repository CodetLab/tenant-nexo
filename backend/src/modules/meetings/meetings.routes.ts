// modules/meetings/meetings.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { MeetingsController } from "./meetings.controller";

const router = Router();

router.get("/", authMiddleware, MeetingsController.findAll);

router.get("/:id", authMiddleware, MeetingsController.findById);

router.post("/", authMiddleware, MeetingsController.create);

export default router;