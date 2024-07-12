const TransactionService = require("../services/transaction.service");

const transactionService = new TransactionService();


const create = async (req, res, next) => {
    try {

        const payload = req.body;
        const transaction = await transactionService.createTransaction({userId:req.user.id,...payload});

        return res.status(201).json({
            data: transaction,
            success: true,
            message: "Successfully created a transaction",
            status: 0
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const transaction = await transactionService.updateTransaction(req.body,id);
        return res.status(201).json({
            data: transaction,
            success: true,
            message: "Successfully updated a transaction",
            status: 0
        });
    } catch (error) {
        next(error);
    }
}

const destory = async (req, res, next) => {
    try {
        const response = await transactionService.deleteTransaction(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted a transaction",
            status: 0
        });
    } catch (error) {
        next(error);
    }
}


const get = async (req, res, next) => {
    try {
        const response = await transactionService.getTransactionById(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched a transaction",
            status: 0
        })
    } catch (error) {
        next(error);
    }
}


const getAll = async (req, res, next) => {
    try {

        const filter = req.body;
        const response = await transactionService.getAllTransactions(filter, req.user.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched all transactions",
            status: 0
        })

    } catch (error) {
        next(error);
    }
}

const getAllBetweenDates = async (req, res, next) => {
    try {
        const filter = req.body;
        if (filter.startDate == null || filter.endDate == null) {
            throw new Error("please enter valid start date and end date of transactions");
        }

        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);

        if (startDate > endDate) {
            throw new Error("start date cannot be greater than end date");
        }

        delete filter.startDate;
        delete filter.endDate;

        filter.userId = req.user.id;
        const response = await transactionService.getTransactionBetweenDates(filter, startDate, endDate);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched all transactions between start date and end date",
            status: 0
        })

    } catch (error) {
        next(error);
    }
}




module.exports = {
    create, destory, get, getAll, getAllBetweenDates, update
}