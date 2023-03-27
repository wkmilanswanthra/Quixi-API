const mongoose = require("mongoose");
const expenseService = require("../../services/user/expenseService");
const transactionController = require("../../controllers/user/transactionController");
const {simplifyExpenses} = require('../../middleware/debtSimplify')

exports.createExpense = async (req, res) => {
    if (!req.body)
        return res.status(400).send({message: "Request body is required"});
    console.log(req.body);

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const transactions = await transactionController.createMultipleTransactions(req, res);
        console.log("transactions", transactions)
        const expense = await expenseService.createExpense(req.body, transactions);
        await session.commitTransaction();
        res.status(201).json({'expense': expense, 'transactions': transactions});
    } catch (e) {
        await session.abortTransaction();
        res
            .status(500)
            .send({message: e.message || "There was an error saving the expense"});
    } finally {
        await session.endSession();

    }
};

exports.findExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.fetchAllExpenses();
        res.status(200).json(expenses);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports.findExpenseById = async (req, res) => {
    try {
        const expenses = await expenseService.fetchExpenseById();
        res.status(200).json(expenses);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports.updateExpenseById = async (req, res) => {
    try {
        const expenses = await expenseService.updateExpenseById();
        res.status(200).json(expenses);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports.deleteExpenseById = async (req, res) => {
    try {
        const expenses = await expenseService.deleteExpenseById();
        res.status(200).json(expenses);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports;
