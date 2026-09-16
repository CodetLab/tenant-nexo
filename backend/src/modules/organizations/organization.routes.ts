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

router.post(
    "/:id/leave",
    authMiddleware,
    controller.leave
);
export default router;