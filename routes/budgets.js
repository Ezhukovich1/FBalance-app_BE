import { Router } from "express";

import { createBudget, addMemberToBudget, getBudgets} from "../controllers/budget.js";
import { checkAuth } from "../utils/checkAuth.js";
import { checkBudgetPermisson } from "../utils/checkBudgetPermission.js";

const router = new Router();

// createBudget
router.post('/', checkAuth, createBudget);
router.get('/', checkAuth, getBudgets);

// added new Member to Budget
router.post('/addMember/:id', checkAuth, checkBudgetPermisson, addMemberToBudget);

export default router;