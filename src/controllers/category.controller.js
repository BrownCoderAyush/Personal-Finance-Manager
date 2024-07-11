const CategoryService = require("../services/category.service");

const categoryService = new CategoryService();


const create = async (req, res,next) => {
    try {

        if(req.body.type==null){
            throw new Error("type field not present");
        }

        const isAlreadyPresent = await categoryService.isCategoryAlreadyPresent(req.user.id,req.body.type);
        if(isAlreadyPresent){
            throw new Error("Category for the user already present");
        }
        const category = await categoryService.createCategory(req.user.id,req.body.type);

        return res.status(201).json({
            data: category,
            success: true,
            message: "Successfully created a category",
            status : 0
        });
    } catch (error) {
       next(error);
    }
}
/*
DELETE
url -> category/:id
*/
const destory = async (req, res,next) => {
    try {
        const response = await categoryService.deleteCategory(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted a category",
            status:0
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
/*
GET
url -> category/:id
*/
const get = async (req, res,next) => {
    try {
        const response = await categoryService.getCategoryById(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched a category",
            status : 0
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}
/*
GET 
url -> cateogory/
*/
const getAll = async (req, res,next) => {
    try {

        const response = await categoryService.getAllCategories(req.user.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched all cities",
            status:0
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = {
    create,destory,get,getAll
}