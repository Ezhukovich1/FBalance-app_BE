import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
    try {
        const {amount, categoryId, comment} = req.body;

        const newTransaction = new Transaction({
            amount,
            comment,
            category: categoryId,
            budget: req.params.id
        })

        await newTransaction.save();

        return res.json({newTransaction})
    } catch (error) {
        res.json({ message: 'Something goes wrong!', error: error})
    }
};

export const getTransactions = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    const {id, startDate, lastDate} = req.params;

    let start = new Date(startDate);
    let end = new Date(lastDate);

    start.setUTCHours(0,0,0,0);
    end.setUTCHours(23,59,59,999);

    if(!budget) {
      return res.json({message: "Budget not found!"});
    }

    const list = await Transaction.find({budget: {$in: id}, createdAt: {$gte: start, $lte: end}});

    res.json(list);
  } catch (error) {
    res.json({message: "Something goes wrong!", errors: error});
  }

};