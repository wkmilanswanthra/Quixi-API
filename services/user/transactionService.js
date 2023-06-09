const mongoose = require("mongoose");
const transactionSchema = require("../../schema/transaction");
const {simplifyExpenses} = require("../../middleware/debtSimplify");

let createTransaction = (exports.createTransaction = async (
    transactionData
) => {
    transactionData._id = new mongoose.mongo.ObjectId();
    console.log(transactionData);
    const newTransaction = new transactionSchema(transactionData);
    await newTransaction.save();
    return newTransaction;
});
exports.createMultipleTransactions = async (body) => {
    let newTransactions = [];
    console.log("Creating multiple transactions");
    console.log(JSON.parse(body.contribution));
    const simplify = simplifyExpenses(
        JSON.parse(body.contribution),
        body.splitMethod
    );
    console.log(simplify);
    for (const transaction of simplify) {
        if (transaction.amount === 0) continue;
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
    return transactionSchema
        .find({
            $and: [
                {
                    $or: [
                        {
                            paidBy: userId,
                        },
                        {
                            paidTo: userId,
                        },
                    ],
                },
                {
                    status: "pending",
                },
            ],
        })
        .populate("paidTo")
        .populate("paidBy");
};
