const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/authentication");
const expenseController = require("../../controllers/user/expenseController");

router.post("/", checkAuth, expenseController.createExpense);
router.get("/", checkAuth, expenseController.findExpenses);
router.get("/:id", checkAuth, expenseController.findExpenseById);
router.get("/non/:id", checkAuth, expenseController.findNonGroupExpenseById);
router.patch("/:id", checkAuth, expenseController.updateExpenseById);
router.delete("/:id", checkAuth, expenseController.deleteExpenseById);

module.exports = router;
