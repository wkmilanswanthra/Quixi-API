const mongoose = require("mongoose");
const expenseService = require("../../services/user/expenseService");
const transactionController = require("../../controllers/user/transactionController");
const groupService = require("../../services/user/groupService");
const groupSchema = require("../../schema/group");

exports.createExpense = async (req, res) => {
    if (!req.body)
        return res.status(400).send({message: "Request body is required"});

    console.log(req.body);
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let group = null;
        const transactions = await transactionController.createMultipleTransactions(
            req
        );
        const expense = await expenseService.createExpense(req.body, transactions);
        if (req.body.group) {
            group = await groupSchema.findByIdAndUpdate(
                req.body.group,
                {$push: {expenses: expense._id}},
                {new: true}
            );
        }
        res.status(201).send({expense, group});
    } catch (e) {
        await session.abortTransaction();
        console.log(e);
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

exports.findNonGroupExpenseById = async (req, res) => {
    console.log("Trying to find non group expense by id");
    try {
        console.log(req.params.id);
        const expenses = await expenseService.fetchNonGroupExpenseById(
            req.params.id
        );
        res.status(200).json(expenses);
    } catch (e) {
        console.log(e);
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
        const expenses = await expenseService.deleteExpenseById(req.params.id);
        res.status(200).json(expenses);
    } catch (e) {
        console.log(e);
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports;
