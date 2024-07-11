const { Op, where } = require("sequelize");
const { Transaction } = require("../models/index");
const CategoryService = require("../services/category.service");

class TransactionService {
    constructor() {
        this.categoryService = new CategoryService();
    }
    async createTransaction(details) {

        const category = await this.categoryService.getCategoryById(details.categoryId);

        if (category == null) {
            throw new Error(`category with id ${details.categoryId} dosen't exist.`);
        }
        const response = await Transaction.create({
            amount: details.amount,
            date: new Date(details.date),
            categoryId: details.categoryId,
            description: details.description,
            transaction_type: details.transactionType
        }, { raw: true }
        );
        return response;

    }

    async getAllTransactions(filter, userId) {

        const getAllCategories = await this.categoryService.getAllCategories(userId);

        const categoryIds = getAllCategories.map((category) => category.id);

        const response = await Transaction.findAll({
            where: {
                ...filter,
                categoryId: {
                    [Op.in]: categoryIds
                }
            },
            raw: true
        });
        return response;

    }

    async getTransactionById(id) {

        const response = await Transaction.findByPk(id, { raw: true });
        return response;

    }

    async getTransactionBetweenDates(filter,startDate,endDate){

        const response = await Transaction.findAll({
            where : {
                date: {
                    [Op.between]: [startDate,endDate]
                },
                ...filter
            }
        })

        return response;

    }

    async updateTransaction(payload,id){
        const transaction = await Transaction.update(payload,{
                where:{
                    id
                }
        });

        const updatedTransaction = await Transaction.findByPk(id,{raw:true});

        return updatedTransaction;
    }


    async deleteTransaction(id) {
        const transaction = await Transaction.findByPk(id);

        if (transaction) {
            await transaction.destroy();
            return true;
        }
        return false; // transaction not found
    }




}




module.exports = TransactionService;