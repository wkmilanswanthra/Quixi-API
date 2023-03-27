const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/authentication");
const transactionController = require("../../controllers/user/transactionController");

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.fetchAllTransactions);
router.get("/:id", checkAuth, transactionController.fetchTransactionById);
router.get("/pending/:user", checkAuth, transactionController.fetchAllPendingTransactionsByUserId);
router.patch("/:id", checkAuth, transactionController.updateTransactionById);
router.delete("/:id", checkAuth, transactionController.deleteTransactionById);

module.exports = router;
