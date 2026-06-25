// modules/observations/observations.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ObservationsController } from "./observations.controller";

const router = Router();

router.get("/", authMiddleware, ObservationsController.findAll);

router.get(
  "/student/:studentId",
  authMiddleware,
  ObservationsController.findByStudent
);

router.post("/", authMiddleware, ObservationsController.create);

export default router;