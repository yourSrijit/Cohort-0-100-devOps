const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = Router();
let jwt=require("jsonwebtoken");
const { JWT_PSW } = require("../config");




// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    let { username,password }=req.body;
    await Admin.create({
        username:username,
        password:password
    });
    res.send("Admin created successfuly");
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    let {username,password}=req.body;
    // console.log(username);
    const admin= await Admin.find({
        username:username,
        password:password
    })
    if(admin){
        let first={username,password};
        let token=jwt.sign(first,JWT_PSW);
        res.json({
            token
        })
    }
    else{
        req.json({
            msg:"Admin not exists"
        })
    }
    
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    let{ title,description,imageLink,price }=req.body;
    let newCourse=await Course.create({
        title,
        description,
        imageLink,
        price
    });
    res.json({
        message: 'Course created successfully', courseId: newCourse._id 
    })
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    let allCourse=await Course.find({})
    res.json({
        allCourse
    })

});

module.exports = router;