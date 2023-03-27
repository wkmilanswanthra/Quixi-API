const mongoose = require("mongoose");
const transactionSchema = require("../../schema/transaction");

let createTransaction = exports.createTransaction = async (transactionData) => {
    transactionData._id = new mongoose.mongo.ObjectId();
    const newTransaction = new transactionSchema(transactionData);
    await newTransaction.save();
    return newTransaction;
};
exports.createMultipleTransactions = async (transactions) => {
    let newTransactions = [];
    for (const transaction of transactions) {
        const newTransaction = await createTransaction(transaction);
        newTransactions.push(newTransaction);
    }
    return newTransactions;
};

exports.fetchAllTransactions = async (expenseId) => {
    return transactionSchema.find();
};

exports.fetchTransactionById = async (transactionId) => {
};

exports.updateTransactionById = async (transactionId) => {
};

exports.deleteTransactionById = async (transactionId) => {
};

exports.fetchAllPendingTransactionsByUserId = async (userId) => {
    return transactionSchema.find({
        "$and": [{
            "$or": [{
                paidBy: userId
            }, {
                paidTo: userId
            }]
        }, {
            status: "pending"
        }],
    }).populate('paidTo').populate('paidBy');
}