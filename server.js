const express = require ('express');
const bodyParser = require('body-parser');

const db = require('./src/models/index');
const app = express();

const {Category} = require('./src/models/index');
const { PORT } = require('./src/config/serverConfig');
const APIRoutes = require('./src/routes/index');
const UserService = require('./src/services/user.service');

const errorHandlerMiddleware = (err, req, res, next) => {
    // Handle the error  
    console.log(err);
    return res.json({
        status : 1,
        msg : err.message,
        error : err.stack
    });
};

const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true})); 
    app.use(APIRoutes);
    
    app.use(errorHandlerMiddleware);
    db.sequelize.sync({alter:true, logging:false});


    app.listen(PORT ,async ()=>{

    // const userService = new UserService();

    // userService.signUp({
    //     email:"ayushchopra0@gmail.com",
    //     password:"hello",
    //     username:"physicsapien",
    //     firstname:"Ayush",
    //     lastname:"Chopra",
    //     phonenumber:"9950787281"
    // })

    // await Category.create({
    //     userId:10,
    //     type:"Jewellery"
    // })
    console.log(`Server Started on Port : ${PORT}`);
    })
}

prepareAndStartServer();