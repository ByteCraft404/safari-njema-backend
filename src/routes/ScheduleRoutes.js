import { Router } from "express";
import {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/ScheduleController.js";
const router = Router();
router.get("/", getAllSchedules);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;
