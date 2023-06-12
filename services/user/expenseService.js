const mongoose = require("mongoose");
const expenseSchema = require("../../schema/expense");
const transactionSchema = require("../../schema/transaction");

exports.createExpense = async (expenseData, transactions) => {
    expenseData._id = new mongoose.mongo.ObjectId();
    let members = [];
    transactions.forEach((transaction) => {
        members.push(transaction._id);
    });

    console.log(members);
    expenseData.transactions = members;
    const newExpense = new expenseSchema(expenseData);
    await newExpense.save();
    return newExpense;
};

exports.fetchAllExpenses = async () => {
    const expenses = await expenseSchema.find();
    return expenses;
};

exports.fetchExpenseById = async (expenseId) => {
};

exports.fetchNonGroupExpenseById = async (userId) => {
    const expense = await expenseSchema.find({
        $and: [
            {
                createdBy: userId,
            },
            {
                groupExpense: false,
            },
        ],
    });
    return expense;
};

exports.updateExpenseById = async (expenseId) => {
};

exports.deleteExpenseById = async (expenseId) => {
    const exp = await expenseSchema.findById(expenseId);
    // if (!exp) return null;
    const transactions = exp.transactions;
    transactions.forEach(async (transaction) => {
        let trans = await transactionSchema.findByIdAndDelete(transaction);
        console.log("Deleted", trans);
    });
    const expense = await expenseSchema.findByIdAndDelete(expenseId);
    return expense;
};
