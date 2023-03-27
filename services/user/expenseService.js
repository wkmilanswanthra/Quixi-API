const mongoose = require("mongoose");
const expenseSchema = require("../../schema/expense");

exports.createExpense = async (expenseData, transactions) => {
    console.log('transactions in expense:', transactions)
    expenseData._id = new mongoose.mongo.ObjectId();
    let members = [];
    for (let i = 0; i < transactions.length; i++) {
        console.log(transactions[i])
        members.push(transactions[i]._id);
    }

    expenseData.transactions = members;
    console.log(expenseData)
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