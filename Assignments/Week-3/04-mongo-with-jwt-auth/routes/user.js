const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { JWT_PSW } = require("../config");
const { User, Course } = require("../db");
let jwt=require("jsonwebtoken");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    let {username ,password}=req.body;
    let newUser=await User.create({
        username,
        password
    })
    res.json({
        msg:"User creation successful"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    let {username ,password}=req.body;
    const user= await User.find({
        username:username,
        password:password
    })
    if(user)
    {
    let first={username ,password}
    let response=jwt.sign(first,JWT_PSW);
    res.json({
        token:response
    })
    }
    else{
    res.json({
        msg:"User not exists"
    })
}

});

router.get('/courses', userMiddleware,async (req, res) => {
    // Implement listing all courses logic
    const allCourses=await Course.find({});
    if(allCourses){
        res.json({
        allCourses
    })
    }
    else{
        res.json({
            msg:"Somthing went wrong"
        })
    }

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    await User.updateOne(
        {
        username:username
         },{
            "$push":{
                purchasedCourses :courseId
                }
            })
    res.json({
        message:"Purchase complete"
    })
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
      // Implement fetching purchased courses logic 
      let { username,password }=req.headers;
      const user=await User.findOne({username});
      console.log(user.purchasedCourses);
      const courses=await Course.find({
          _id:{"$in":user.purchasedCourses}
      })
      res.json({
          courses:courses
      })
});

module.exports = router
