const { Op } = require("sequelize");
const { SavingGoal } = require("../models/index");
const TransactionService = require("./transaction.service");


class SavingGoalService {

    constructor() {
        this.transactionService = new TransactionService();
    }
    async createGoal(details, userId) {

        const response = await SavingGoal.create({
            userId: userId,
            date: details.date,
            amount: details.amount
        }, { raw: true }
        );

        console.log(response, "res");
        return response;

    }

    async getAllGoals(userId) {

        const response = await SavingGoal.findAll({
            where: {
                userId
            },
            raw: true
        });
        return response;

    }

    async getGoalById(id) {

        const response = await SavingGoal.findByPk(id, { raw: true });
        console.log(response, "rees");
        return response;

    }

    async getProgress(userId, goalIds) {

        console.log(userId, goalIds);
        const result = [];

        for (const id of goalIds) {

            const goalDetails = await this.getGoalById(id);
            console.log(goalDetails.createdAt, "gd");

            const totalNetGoalSummaryTillDate = await this.getNetSavedAmtSummary(userId, goalDetails);

            console.log(totalNetGoalSummaryTillDate, "tnstd");
            result.push(totalNetGoalSummaryTillDate);

        }

        console.log(result, "result");
        return result;
    }

    async getNetSavedAmtSummary(userId, goalDetails) {
        console.log(goalDetails.CreatedAt, new Date());
        const result = await this.transactionService.getTransactionBetweenDates({ userId }, goalDetails.createdAt, new Date());
        let amt = 0;
        let response = {};
        let summary = "";

        console.log(result, "between dates");
        result.forEach(transaction => {
            if (transaction.transaction_type == '-') {
                amt -= transaction.amount;
            } else {
                amt += transaction.amount;
            }
        });
        // if current date is greater than the aim set for the goal 
        if (new Date() > goalDetails.date) {
            if (amt >= goalDetails.amount) {
                summary = `your goal date has been exceded and now you have lead of ${amt - goalDetails.amount} amount`;
            } else {
                summary = `your goal date has been exceded and now you are behind of your target by ${goalDetails.amount - amt} amount`;
            }
        } else {
            // if current date is lesser than or equal to the set goal date 
            if (amt >= goalDetails.amount) {
                summary = `your haven't reached goal date till now and currently you have lead of ${amt - goalDetails.amount} amount`;
            } else {
                summary = `your haven't reached goal date till now and currently you are behind your target by ${goalDetails.amount - amt}`;
            }
        }

        response.goalId = goalDetails.id;
        response.goaltimestamp = goalDetails.date;
        response.summary = summary;

        return response;
    }

     getDateandTimeString(Date) {
        const year = Date.getFullYear(); 
        const month = Date.getMonth() + 1;  
        const date = Date.getDate();        
        const hours = Date.getHours();       
        const minutes = Date.getMinutes();    
        const seconds = Date.getSeconds();   
        const milliseconds = Date.getMilliseconds();

        const result = {};
        result.Date = `${year}-${month}-${date}`;
        result.Time = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        return result;
    }

    async deleteGoal(id) {
        const goal = await SavingGoal.findByPk(id);

        if (goal) {
            await goal.destroy();
            return true;
        }
        return false; // goal not found
    }

}




module.exports = SavingGoalService;