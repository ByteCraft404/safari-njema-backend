import { Router } from "express";

import { getAllEvents } from "../controllers/EventController.js";
const router = Router();
router.get("/", getAllEvents);

export default router;
