


const userSignUpValidator = (req,res,next)=>{
    try {
        const data = req.body;

        if( data.firstname==null||
            data.lastname==null ||
            data.username==null ||
            data.password==null ||
            data.phonenumber==null
        ){
            const err =  new Error("required user fields not present.");
            console.log("here");
            next(err);
        }
    
        next();
    } catch (error) {
        next(error);   
    }  
}
const userLogInValidator = (req,res,next)=>{
    try {
        const data = req.body;

        if( data.email==null||
            data.password==null
        ){
            const err =  new Error("required logIn fields not present.");
            next(err);
        }
    
        next();
    } catch (error) {
        next(error);   
    } 
}

const transactionCreateValidator=(req,res,next)=>{
    try {
        const payload = req.body;
        if (
            payload.amount == null ||
            payload.date == null ||
            payload.categoryId == null ||
            payload.transactionType == null
        ) {
            throw new Error("required fields for creating transaction doesn't exist.");
        }
        next();
    } catch (error) {
        next(error);
    }


}

const savingGoalCreateValidator=(req,res,next)=>{
    try {
        const payload = req.body;
        if (
            payload.date == null ||
            payload.amount == null
        ) {
            throw new Error("required fields for creating saving goal doesn't exist.");
        }
        next();
    } catch (error) {
        next(error);
    }


}
module.exports = {
    userSignUpValidator,
    userLogInValidator,
    transactionCreateValidator,
    savingGoalCreateValidator
}