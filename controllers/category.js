import Category from "../models/Category.js";
import Budget from "../models/Budget.js";

export const createCategory = async (req, res) => {
    try {
        const {budgetId, title} = req.body;

        if(!title || !budgetId) return res.json({message: "Something goes wrong!"});

        const newCategory = new Category({title});

        newCategory.budgets.push(budgetId);
        await newCategory.save();

        try {
            await Budget.findByIdAndUpdate(budgetId, {
                $push: {categories: newCategory._id}
            })
        } catch (error) {
            console.log(error)
        }

        res.json({data: {category: newCategory}});
    } catch (error) {
        res.json({message: "Something goes wrong!"})
    }
};

export const getCategories = async(req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
    
        if(!budget) {
          return res.json({message: "Budget not found!"});
        }
        const list = await Promise.all(
          budget.categories.map((category) => Category.findById(category))
        )
    
        res.json({data: list})
      } catch (error) {
        res.json({message: "Something goes wrong!", errors: error});
      }
};
