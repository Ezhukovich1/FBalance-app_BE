import Budget from '../models/Budget.js';

export const checkBudgetPermisson = async (req, res, next) => {
    const checkIfMember = await Budget.find({"members": {$in: req.userId}});

    try {
        if(checkIfMember.length != 0) {
            next();
        } else {
            return res.json({
                message: 'Access denied.'
            });
        }
        
    } catch (error) {
        return res.json({
            message: 'Access denied.'
        });
    }

};