const errorHandler = (err, req, res, next) => {
    // Handle the error  
    console.log(err);
    return res.json({
        status : 1,
        msg : err.message,
        error : err.stack
    });
};

module.exports = errorHandler;