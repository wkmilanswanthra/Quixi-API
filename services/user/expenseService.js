const mongoose = require("mongoose");
const expenseSchema = require("../../schema/expense");

exports.createExpense = async (expenseData, transactions) => {
    expenseData._id = new mongoose.mongo.ObjectId();
    let members = [];
    for (const transaction in transactions) {
        members.push(transaction._id);
    }
    expenseData.members = members;
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