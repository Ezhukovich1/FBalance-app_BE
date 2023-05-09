import Budget from "../models/Budget.js";
import User from "../models/User.js";

export const createBudget = async (req, res) => {
    try {
        const {title} = req.body;

        const newBudget = new Budget({
            title,
            author: req.userId,
        })

        newBudget.members.push(req.userId);

        await newBudget.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { budgets: newBudget}
        })

        return res.json({data: {newBudget}})
    } catch (error) {
        res.json({ message: 'Something goes wrong!', error: error})
    }
};

export const addMemberToBudget = async(req, res) => {

    try {
      const {phone} = req.body;
      const budget = await Budget.findById(req.params.id);
      const user = await User.findOne({"phone": {$in: phone}});

      if(!phone) return res.json({message: "Phone not found!"});

      if(!budget) {
        return res.json({message: "Budget not found!"});
      }

      if(!user) {
        return res.json({message: "User not found!"});
      }

      // IGNORED
      // if (req.userId === user._id) {
      //   return res.json({message: "Can not add yourself to budget"});
      // }

      try {
        await Budget.findByIdAndUpdate(req.params.id, {
            $push: {members: user._id}
        })

      } catch (error) {
          return res.json({message: "can not add member", errors: user})
      }

      try {
        await User.findByIdAndUpdate(user._id, {
          $push: {budgets: budget._id}
        })
        
      } catch (error) {
          return res.json({message: "can not add budget to user", errors: {budget, user}})
      }


      res.json({message: "User added to budget!"});
      } catch (error) {
        res.json({message: "Something goes wrong!", errors: error});
      }
};

export const getBudgets = async(req, res) => {
  try {

    const list = await Budget.find({members: {$in: req.userId}});

    res.json({data: list});
  } catch (error) {
    res.json({message: "Something goes wrong!", errors: error});
  }
};