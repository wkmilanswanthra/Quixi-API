const mongoose = require("mongoose");
const transactionService = require("../../services/user/transactionService");

exports.createTransaction = async (req, res) => {
    if (!req.body)
        return res.status(400).send({message: "Request body is required"});
    try {
        const transaction = await transactionService.createTransaction(
            req.body,
            req.params.id
        );
        res.status(201).json(transaction);
    } catch (e) {
        res
            .status(500)
            .send({message: e.message || "There was an error saving the expense"});
    }
};

exports.createMultipleTransactions = async (req) => {
    if (!req.body) throw new Error("Request body is required");
    console.log("Trying to create multiple transactions");
    try {
        return await transactionService.createMultipleTransactions(req.body);
    } catch (e) {
        // res
        //   .status(500)
        //   .send({
        //     message: e.message || "There was an error saving the transaction",
        //   });
        throw new Error(e.message);
    }
};

exports.fetchAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.fetchAllTransactions();
        res.status(200).json(transactions);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports.fetchAllPendingTransactionsByUserId = async (req, res) => {
    try {
        const transactions =
            await transactionService.fetchAllPendingTransactionsByUserId(
                req.params.user
            );
        res.status(200).json(transactions);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports.fetchTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.fetchTransactionById(
            req.params.id
        );
        res.status(200).json(transaction);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports.updateTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.updateTransactionById(
            req.params.id,
            req.body
        );
        res.status(200).json({transaction: transaction, status: "success"});
    } catch (e) {
        console.log(e);
        res.status(500).send({message: e.message || "Server Error"});
    }
};

exports.deleteTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.deleteTransactionById(
            req.params.id
        );
        res.status(200).json(transaction);
    } catch (e) {
        res.status(500).send({message: e.message || "Server Error"});
    }
};
