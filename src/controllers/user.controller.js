const UserService = require("../services/user.service");

const userService = new UserService();
const create = async (req,res,next)=>{
    try {

        const {
            firstname,
            lastname,
            username,
            password,
            phonenumber,
            email,
            occupation,
            address
        } = req.body;

        const response = await userService.signUp({
            firstname,
            lastname,
            username,
            password,
            phonenumber,
            email,
            occupation,
            address
        });

        return res.status(201).json({
            success : true , 
            message : "Successfully Created a new user" , 
            data : response ,
            status: 0
        })
    } catch (error) {
        next(error);
    }

}

const signIn = async (req,res,next)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            success : true , 
            message : "Successfully LoggedIn" , 
            data : response,
            status: 0
        })          
    } catch (error){
        next(error);
    }
}


module.exports = {
    create,
    signIn
}