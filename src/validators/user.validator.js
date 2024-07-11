


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

module.exports = {
    userSignUpValidator,
    userLogInValidator
}