let express = require("express");
let app = express();
let countReq=0;
function countRequest(req,res,next){
countReq++;
console.log(`count request is so far ${countReq}`);
next(); 
}
app.get("/srijit",countRequest,(req,res)=>{
   res.send("Hi srijit ")
});

app.listen(4000, () => {
    console.log('Connected on port no 3000');
})
