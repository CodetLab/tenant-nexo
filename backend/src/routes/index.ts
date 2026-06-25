import { Router } from "express";

import students from "../modules/students/students.routes";
import observations from "../modules/observations/observations.routes";
import meetings from "../modules/meetings/meetings.routes";
import strategies from "../modules/strategies/strategies.routes";
import goals from "../modules/goals/goals.routes";
import syncRoutes from "../modules/sync/sync.routes";
import organizationRoutes from "../modules/organizations/organization.routes";

const router = Router();
router.use("/sync", syncRoutes);
router.use("/students", students);
router.use("/observations", observations);
router.use("/meetings", meetings);
router.use("/strategies", strategies);
router.use("/goals", goals);
router.use("/organizations", organizationRoutes);
router.use("/health", (req, res) => res.send("OK"));

export default router;