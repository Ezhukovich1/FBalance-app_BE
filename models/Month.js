import mongoose from "mongoose";

const MonthSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }],
}, {timestamps: true});

export default mongoose.model('Month', MonthSchema);