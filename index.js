import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import authRoute from './routes/auth.js';
import budgetRoute from './routes/budgets.js';
import categoryRoute from './routes/categories.js';
import transactionRoute from './routes/transactions.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3002;
const DB_NAME = process.env.DB_NAME || 'test';
const DB_USER = process.env.DB_USER || 'test';
const DB_PASSWORD = process.env.DB_PASSWORD || 'test';

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/budgets', budgetRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/transactions', transactionRoute);

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@fbalance.wstjpqt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};
start();
