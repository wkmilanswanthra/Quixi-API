const mongoose = require("mongoose");
const expenseSchema = require("../../schema/expense");

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

exports.updateExpenseById = async (expenseId) => {
};

exports.deleteExpenseById = async (expenseId) => {
};
