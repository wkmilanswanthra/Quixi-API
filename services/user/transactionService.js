const mongoose = require("mongoose");
const transactionSchema = require("../../schema/transaction");
const {simplifyExpenses} = require("../../middleware/debtSimplify");
const userService = require("../../services/user/userService");

let createTransaction = (exports.createTransaction = async (
    transactionData
) => {
    transactionData.amount = Math.round(transactionData.amount * 100) / 100;
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
    return transactionSchema
        .findById(transactionId)
        .populate("paidTo")
        .populate("paidBy");
};

exports.updateTransactionById = async (transactionId, data) => {
    console.log(data);
    if (data.rating) {
        let user = await userService.findUserById(data.user);
        console.log(user);
        user.rating = Math.round(
            (parseInt(user.rating) + parseInt(data.rating)) / 2
        );
        await userService.updateUserById(data.user, user);
    }
    return transactionSchema
        .findByIdAndUpdate(transactionId, data, {new: true})
        .populate("paidTo")
        .populate("paidBy");
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
                    $or: [
                        {
                            status: "pending",
                        },
                        {
                            status: "paid",
                        },
                    ],
                },
            ],
        })
        .populate("paidTo")
        .populate("paidBy");
};
