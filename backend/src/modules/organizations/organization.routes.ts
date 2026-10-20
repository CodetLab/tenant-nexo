import { Router } from "express";
import * as controller from "./organization.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Organizations


router.get("/", authMiddleware, controller.list);
router.post("/", authMiddleware, controller.create);
router.post("/leave", authMiddleware, controller.leave);
router.delete("/:organizationId", authMiddleware, controller.remove);

export default router;