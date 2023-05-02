import { Router } from "express";

import { createCategory, getCategories } from "../controllers/category.js";
import { checkAuth } from "../utils/checkAuth.js";
import { checkBudgetPermisson } from "../utils/checkBudgetPermission.js";

const router = new Router();

// createCategory
router.post('/', checkAuth, checkBudgetPermisson, createCategory);

// getCategories by BudgetId
router.get('/:id', checkAuth, checkBudgetPermisson, getCategories);

export default router;