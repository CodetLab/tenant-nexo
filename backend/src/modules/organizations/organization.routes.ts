import { Router } from "express";
import * as controller from "./organization.controller";

import {
  createStudentController,
  listStudentsController,
  findStudentByIdController,
} from "../students/students.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Organizations
router.get("/", authMiddleware, controller.list);
router.post("/", authMiddleware, controller.create);
router.post("/leave", authMiddleware, controller.leave);
router.delete("/:organizationId", authMiddleware, controller.remove);

// Students
router.post(
  "/:organizationId/students",
  authMiddleware,
  createStudentController,
);

router.get("/:organizationId/students", authMiddleware, listStudentsController);

router.get(
  "/:organizationId/students/:studentId",
  authMiddleware,
  findStudentByIdController,
);

export default router;

