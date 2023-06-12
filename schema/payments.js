const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
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
        default: new Date(),
    },
    updatedOn: {
        type: Date,
        required: true,
        default: new Date(),
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
    transactionId: {
        type: mongoose.mongo.ObjectId,
        required: true,
        ref: "Transaction",
    },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
