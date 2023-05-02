import { Router } from "express";

import { createTransaction, getTransactions } from "../controllers/transaction.js";
import { checkAuth } from "../utils/checkAuth.js";
import { checkBudgetPermisson } from "../utils/checkBudgetPermission.js";

const router = new Router();

// createTransaction
router.post('/:id', checkAuth, checkBudgetPermisson, createTransaction);
router.get('/:id/:startDate/:lastDate', checkAuth, checkBudgetPermisson, getTransactions);


export default router;