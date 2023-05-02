import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    budgets: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Budget'
    }],
}, {timestamps: true});

export default mongoose.model('Category', CategorySchema);