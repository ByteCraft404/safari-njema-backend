import { Router } from "express";
import { getAllRoutes, updateRoute, updateRouteStatus, deleteRoute } from "../controllers/RouteController.js";
import { createRoute } from "../controllers/RouteController.js";

const router = Router();

router.get("/", getAllRoutes);
router.post("/", createRoute);
router.put("/:id", updateRoute); // Edit route
router.patch("/:id/status", updateRouteStatus); // Activate/deactivate
router.delete("/:id", deleteRoute); // Delete route

export default router;
