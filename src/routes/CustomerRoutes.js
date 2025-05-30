import express from "express";
import {
  registerCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/CustomerController.js";

const router = express.Router();

router.post("/", registerCustomer); // Register customer
router.get("/", getAllCustomers); // Get all customers
router.get("/:id", getCustomerById); // Get customer by ID
router.put("/:id", updateCustomer); // Update customer
router.delete("/:id", deleteCustomer); // Delete customer

export default router;
