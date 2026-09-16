import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { StudentsController } from "./students.controller";

const router = Router();

router.get("/", authMiddleware, StudentsController.findAll);
router.get("/:id", authMiddleware, StudentsController.findById);
router.post("/", authMiddleware, StudentsController.create);

export default router;