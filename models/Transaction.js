import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
}, {timestamps: true});

export default mongoose.model('Transaction', TransactionSchema);