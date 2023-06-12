const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/user/paymentController");
const checkAuth = require("../../middleware/authentication");

// Create a payment
router.post("/", checkAuth, paymentController.createPayment);

// Get a payment by ID
router.get("/:paymentId", checkAuth, paymentController.getPaymentById);

//Get payments by user ID
router.get("/user/:userId", checkAuth, paymentController.getPaymentsByUserId);

// Update a payment
router.put("/:paymentId", checkAuth, paymentController.updatePayment);

// Delete a payment
router.delete("/:paymentId", checkAuth, paymentController.deletePayment);

module.exports = router;
