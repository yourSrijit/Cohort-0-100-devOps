import exprss  from "express"

const app=exprss();

app.get("/",(req,res)=>{
	res.json({
		message:"Hi Srijit there"
	})
})

app.listen(4000,()=>{
	console.log("Server is running on port 4000")
})