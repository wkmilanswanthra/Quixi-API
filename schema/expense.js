const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.mongo.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: new Date(),
    },
    updatedOn: {
        type: Date,
        required: true,
        default: new Date(),
    },
    category: {
        type: String,
        required: true,
        default: "general",
    },
    transactions: {
        type: Array,
        required: true,
        ref: "Transaction",
    },
    receiptImg: {
        type: String,
        required: false,
        default: null,
    },
    createdBy: {
        type: mongoose.mongo.ObjectId,
        required: true,
        ref: "User",
    },
    splitMethod: {
        type: String,
        required: true,
    },
    groupExpense: {
        type: Boolean,
        required: true,
        default: false,
    },
    summary: {
        type: Object,
        required: false,
        default: null,
    },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
