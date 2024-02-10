const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    let { title,description,price,imageLink  }=req.body;

    let newCourse=await Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    })
    res.send("Course cretaed successfully");
});

router.get('/courses', async(req, res) => {
    // Implement fetching all courses logic
    const response=await Course.find({});
    res.send(
         response
    )
});

module.exports = router;