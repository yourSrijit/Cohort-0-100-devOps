import express from "express";
import cookieParser from "cookie-parser"; //parse a very long string and give an object
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "Srijit123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.get("/",(req,res)=>{
    res.send("Hi Srijit")
})

app.post("/signin", (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    
    // do db validations, fetch id of user from db
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("token", token);
    res.send("Logged in!");
});

app.get("/user", (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Get email of the user from the database
    res.send({
        userId: decoded.id
    })
});


app.post("/logout", (req, res) => {
    res.clearCookie("token");
    // res.cookie("token", "ads");
    res.json({
        message: "Logged out!"
    })
});


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../src/index.html"))
// })

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
});