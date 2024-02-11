const jwt= require("jsonwebtoken");
const { JWT_PSW } = require("../config");


// Middleware for handling auth

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization;
    //token s like bearer [adddfdffdfd.dffdfefe.fefefefe] <- token part
    let words=token.split(" ");
    let jwtToken=words[1];
    let response=jwt.verify(jwtToken,JWT_PSW);
    console.log(response.username);
    if(response && response.username==='admin'){
        next();
    }
    else{
        res.status(403).json({
            msg:"Opps! you are not authinticated"
        })
    }
}

module.exports = adminMiddleware;