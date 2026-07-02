import { Router } from "express";

import * as controller from "./organization.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
    "/",
    authMiddleware,
    controller.create
);

router.get(
    "/my",
    authMiddleware,
    controller.my
);

router.get(
    "/",
    authMiddleware,
    controller.list
);

router.patch(
    "/:id",
    authMiddleware,
    controller.update
);
router.get(
    "/:id/members",
    authMiddleware,
    controller.members
);
export default router;