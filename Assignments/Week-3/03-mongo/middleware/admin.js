// Middleware for handling auth
const { Admin }=require("../db");
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let { username,password }=req.headers;
    Admin.findOne({
        username:username,
        password:password
    })
    .then((resolve)=>{
        if(resolve){
            next();
        }
        else{
            res.status(403).send("User not exists");
        }
    })


}

module.exports = adminMiddleware;