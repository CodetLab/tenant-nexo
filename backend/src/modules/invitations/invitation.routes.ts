import { Router } from "express";

import * as controller from "./invitation.controller";

const router = Router();

router.post(
    "/invitations",
    controller.create
);

router.get(
    "/invitations",
    controller.listByResource
);

router.get(
    "/invitations/mine",
    controller.listMine
);

router.get(
    "/invitations/token/:token",
    controller.getByToken
);

router.get(
    "/invitations/token/:token/validate",
    controller.validate
);

router.post(
    "/invitations/:id/accept",
    controller.accept
);

router.post(
    "/invitations/:id/decline",
    controller.decline
);

router.post(
    "/invitations/:id/revoke",
    controller.revoke
);

export default router;