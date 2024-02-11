const jwt= require("jsonwebtoken");
const { JWT_PSW } = require("../config");


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization;
    const words=token.split(" ");
    let jwtToken=words[1];
    let response=jwt.verify(jwtToken,JWT_PSW);
    if(response.username){
        next();
    }
    else{
        res.status(403).json({
            msg:"Yor are not authiticated"
        })
    }
}

module.exports = userMiddleware;