const express = require("express");
const mainRouter = require("./routes/index");
const app=express();

let cors=require("cors")
app.use(cors());
app.use(express.json());

let authMiddleware=require("./middleware/authMiddleware")


app.use("/api/v1",mainRouter); //api/v1/user

//api/v1/user/signup
//api/v1/user/sigin
//api/v1/user/changePassword 

// api/v1/account/transferMoney 
// api/v1/account/balance 

app.listen(3000,()=>{
    console.log('App in running on port 3000'); 
})
     
