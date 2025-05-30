import express from "express";
import { getAllRoutes } from "../controllers/RouteController.js";
import { createRoute } from "../controllers/RouteController.js";

const router = express.Router();

router.get("/", getAllRoutes);
router.post("/", createRoute);

export default router;
