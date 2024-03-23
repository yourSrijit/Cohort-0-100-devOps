const express=require("express")
const router=express.Router();
let zod=require("zod");
let jwt=require("jsonwebtoken");
let {User,Account} =require("./../db");
const JWT_SECRET=require("../config/config");
const authMiddleware=require("../middleware/authMiddleware")

const signupBodySchema=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})



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

        //crete a new account for the user
        const userId = user._id;
         await Account.create({
            userId,
            balance:1 + Math.random()*10000
         })
    
        const jwtToken=jwt.sign(userId,JWT_SECRET);
        res.json({
            message:"User created Successfully",
            token:jwtToken,
            
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

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

//for searcing person to send money
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports=router;