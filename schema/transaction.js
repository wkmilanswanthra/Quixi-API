const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.mongo.ObjectId,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: new Date
    },
    updatedOn: {
        type: Date,
        required: true,
        default: new Date
    },
    paidBy: {
        type: mongoose.mongo.ObjectId,
        required: true,
        ref: "User",
    },
    paidTo: {
        type: mongoose.mongo.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
});

// Create the User model using the user schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Export the User model
module.exports = Transaction;