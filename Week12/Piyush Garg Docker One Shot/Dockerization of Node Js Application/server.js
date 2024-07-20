const expres=require("express")
const app=expres();
const PORT=4000;

app.get("/",(req,res)=>{
    return res.json("Hi i'm Node js running inside of the Container")
})

app.listen(PORT,()=>{
    console.log("Server is running on port 4000");
})