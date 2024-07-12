const CategoryService = require("./category.service");
const TransactionService = require("./transaction.service");


class ReportService {

    constructor(){
        this.transactionService = new TransactionService();
        this.categoryService = new CategoryService();
    }
    async createMonthlyReport(month,year,userId) {


        // month should be 1-indexed (1-jan) and (12-dec) , if month = -1 generate yearly report 
        
        if(!( (month>=1 && month<=12 ) || month == -1)){
            throw new Error("month field should contain value between 1 and 12");
        }

        let firstDate;
        let lastDate;
        if(month == -1){

            firstDate =  new Date(year, 0, 1);
            lastDate = new Date(year, 11, 31);

        }else{

            firstDate = new Date(year, month - 1, 1); // Month is 0-indexed in Date constructor
            lastDate = new Date(year, month, 0); // 0th day of next month is the last day of current month

        }
        const transactions = await this.transactionService.getTransactionBetweenDates({userId},firstDate,lastDate);
        console.log(transactions , "transactions");
        let amt = 0;

        const report = {};
        for (const transaction of transactions) {
            
            const category = await this.categoryService.getCategoryById(transaction.categoryId);
            const type = category.type;

            // Initialize report[type] if it doesn't exist
            if (!report[type]) {
                report[type] = { expense: 0, income: 0 };
            }
        

            if (transaction.transaction_type == '-') {
                amt -= transaction.amount;
                report[`${type}`]["expense"] += transaction.amount;
            } else {
                amt += transaction.amount;
                report[`${type}`]["income"] += transaction.amount;
            }  


        }  

        report.netsaving = amt;
        
        return report;
        
    }
}




module.exports = ReportService;