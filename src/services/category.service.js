const { Op } = require("sequelize");
const { Category } = require("../models/index");


class CategoryService {
    async createCategory(userId, type) {

        const response = await Category.create({
            userId, type
        }, { raw: true }
        );
        console.log(response, "res");
        return response;

    }

    async getAllCategories(userId) {

        const response = await Category.findAll({
            where: {
                userId
            },
            raw: true
        });
        return response;

    }

    async getCategoryById(id) {

        const response = await Category.findByPk(id, { raw: true });
        return response;

    }


    async deleteCategory(id) {
        const category = await Category.findByPk(id);

        if (category) {
            await category.destroy();
            return true;
        }
        return false; // category not found
    }

    async isCategoryAlreadyPresent(id, type) {

        const category = await Category.findOne({
            where : {
                [Op.and]: [
                    { userId: id },
                    { type: type }
                ]
            },
            raw : true
        });

        if(category)return true;

        return false;
    }
}




module.exports = CategoryService;