const express=require("express")
const router=express.Router();
let zod=require("zod");
let jwt=require("jsonwebtoken");
let {User} =require("./../db");
const JWT_SECRET=require("../config/config");

const signupBodySchema=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})
router.get("/",(req,res)=>{
    res.json({
        msg:"Hi Srijit"
    })
}
)
//signup page router
router.post("/signup",async (req,res)=>{
    const reponse =signupBodySchema.safeParse(req.body);
    if(!reponse){
        return res.status(411).json({
            msg:"Email already taken/Incorrect input"
        })
    }

    const existingUser=await User.findOne({
        username:req.body.username
    });

    if(existingUser){
        res.status(411).json({
            msg:"User already exist try to signin"
        })
    }
    else{
        const newUser=await User.create({
            username :req.body.username,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password
        })
    
        const jwtToken=jwt.sign({userId:user._id},JWT_SECRET);
        res.json({
            message:"User created Successfully",
            token:jwtToken
        })
    }
})

const signinBodySchema=zod.object({
    username:zod.string()
})

//signin router handel

router.post("/signin",async(req,res)=>{
    let response=signinBodySchema.safeParse(req.body);
    if(!response){
        return res.json({
            message:"Input is incorrect"
        })
    }
    const username=req.body.username;
    const password=req.body.password;

   const user=await User.findOne({
    username:username,
    password:password
   });
   if(user){
    const token=jwt.sign({userId:user._id},JWT_SECRET);
    res.json({
        message:'Login successfull',
        token:token
    })
   }
   else{
    res.status(411).json({
        message:"Something is wrong"
    })
   }

})

module.exports=router;