let express=require("express");
let app=express();
let port=3000;

app.get("/",(req,res)=>{
    let {n} =req.query;
})
app.get("/request",(req,res)=>{
    res.send(" I am the request");
})
app.listen(port,()=>{
    console.log('Listening in port no 3000');
})