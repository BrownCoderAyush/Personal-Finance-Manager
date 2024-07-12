const express = require ('express');
const bodyParser = require('body-parser');

const db = require('./src/models/index');
const app = express();


const { PORT } = require('./src/config/serverConfig');
const APIRoutes = require('./src/routes/index');
const errorHandler = require('./src/utils/errorHandlingMiddleware');
const ReportService = require('./src/services/report.service');


const errorHandlerMiddleware = errorHandler;

const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true})); 
    app.use(APIRoutes);
    
    app.use(errorHandlerMiddleware);
    db.sequelize.sync({alter:true, logging:false});


    app.listen(PORT ,async ()=>{
    const reportService = new ReportService();
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

    // const result = await reportService.createMonthlyReport(7,2024,);
    // console.log(result , "report");
    console.log(`Server Started on Port : ${PORT}`);
    })
}

prepareAndStartServer();