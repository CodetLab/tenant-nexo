import { Router } from "express";
import * as controller from "./organization.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Organizations


router.get(
    "/",
    authMiddleware,
    controller.list
);


export default router;