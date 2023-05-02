import mongoose from "mongoose";
import {CategorySchema} from "./Category.js";

export const BudgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cagegory'}],
}, {timestamps: true});

export default mongoose.model('Budget', BudgetSchema);