const express = require ('express');
const bodyParser = require('body-parser');

const db = require('./src/models/index');
const app = express();


const { PORT } = require('./src/config/serverConfig');
const APIRoutes = require('./src/routes/index');
const errorHandler = require('./src/utils/errorHandlingMiddleware');



const errorHandlerMiddleware = errorHandler;

const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true})); 
    app.use(APIRoutes);
    
    app.use(errorHandlerMiddleware);
    db.sequelize.sync({alter:true, logging:false});


    app.listen(PORT ,async ()=>{

    console.log(`Server Started on Port : ${PORT}`);
    })
}

prepareAndStartServer();