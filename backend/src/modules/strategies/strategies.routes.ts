// modules/strategies/strategies.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { StrategiesController } from "./strategies.controller";

const router = Router();

router.get("/", authMiddleware, StrategiesController.findAll);

router.get("/:id", authMiddleware, StrategiesController.findById);

router.post("/", authMiddleware, StrategiesController.create);

export default router;