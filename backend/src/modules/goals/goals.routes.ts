// modules/goals/goals.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { GoalsController } from "./goals.controller";

const router = Router();

router.get("/student/:studentId", authMiddleware, GoalsController.findByStudent);

router.post("/", authMiddleware, GoalsController.create);

export default router;