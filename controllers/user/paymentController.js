const Payment = require("../../schema/payments");
const mongoose = require("mongoose");

const createPayment = async (req, res) => {
    try {
        let paymentData = req.body;
        paymentData._id = new mongoose.mongo.ObjectId();
        const payment = new Payment(paymentData);
        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
};

const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const payment = await Payment.findById(paymentId)
            .populate("paidBy", "name")
            .populate("paidTo", "name")
            .populate("transactionId");
        if (!payment) {
            return res.status(404).json({message: "Payment not found"});
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getPaymentsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const payments = await Payment.find({
            $or: [{paidBy: userId}, {paidTo: userId}],
        })
            .populate("paidBy")
            .populate("paidTo")
            .populate("transactionId");
        if (!payments) {
            return res.status(404).json({message: "Payment not found"});
        }
        res.json(payments);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updatePayment = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        let updateData = req.body;
        updateData.updatedOn = new Date();
        const payment = await Payment.findByIdAndUpdate(paymentId, updateData, {
            new: true,
        });
        if (!payment) {
            return res.status(404).json({message: "Payment not found"});
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deletePayment = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const payment = await Payment.findByIdAndDelete(paymentId);
        if (!payment) {
            return res.status(404).json({message: "Payment not found"});
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaymentsByUserId,
};
