const SavingGoalService = require("../services/savinggoal.service");

const savingGoalService = new SavingGoalService();


const create = async (req, res,next) => {
    try {

        const goal = await savingGoalService.createGoal(req.body,req.user.id);

        return res.status(201).json({
            data: goal,
            success: true,
            message: "Successfully created a saving goal",
            status : 0
        });
    } catch (error) {
       next(error);
    }
}


const progress = async (req, res,next) => {
    try {

        if(req.body.ids==null){
            throw new Error("provide proper format of goal ids");
        }

        const goalIds = req.body.ids;
        const userId = req.user.id;
        const result = await savingGoalService.getProgress(userId,goalIds);

        return res.status(200).json({
            data: result,
            success: true,
            message: "Successfully fetched a category",
            status : 0
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}


const getAll = async (req, res,next) => {
    try {

        const response = await savingGoalService.getAllGoals(req.user.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched all goals",
            status:0
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    create,getAll,progress
}