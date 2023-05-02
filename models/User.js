import mongoose from "mongoose";
import { BudgetSchema } from "./Budget.js";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    budgets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget'
    }]
}, {timestamps: true});

export default mongoose.model('User', UserSchema);