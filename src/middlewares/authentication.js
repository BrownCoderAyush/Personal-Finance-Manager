const AuthService = require("../services/auth.service");



const authenticator = (req,res,next)=>{
        try {
            if(req.headers.authorization==undefined){
                throw new Error("bearer token not present.");
            }
            const authToken = req.headers.authorization.replace("Bearer ", "");
            
            const user = AuthService.verifyToken(authToken);
            req.user = user;    
            next(); 
        } catch (error) {
            next(error);
        }
   
}

module.exports = authenticator;