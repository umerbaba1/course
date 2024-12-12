const { Router } = require("express");
const CourseRoute = Router();
const { CourseModel, PurchaseModel } = require("../db");
const { UserMiddleware } = require("../middleware/user");

CourseRoute.get("/", async (req, res) => {
    const allCourse=await CourseModel.find({})
    res.json({
        allCourse
    })
});

CourseRoute.post("/purchase", UserMiddleware, async (req, res) => {
  const Id=req.userId
  const courseId=req.body.courseId

  //fix if user had already bought the course
  const UserPurchases=  await PurchaseModel.find({
    userId:Id,
    courseId
  })
  console.log(UserPurchases)
  if(UserPurchases.length==1){
    res.json({
        message:"You had already bought the course "
    })
  }else{
    await PurchaseModel.create({
        userId:Id,
        courseId
      })
      res.json({
        message:"Course Purchased"
      })
  }
  
});

CourseRoute.get("/purchases",UserMiddleware,async (req, res) => {
 const userId=req.userId
 const allPurchases= await PurchaseModel.find({
    userId
 })
 const CourseDetail=await CourseModel.find({
    _id:{$in : allPurchases.map(x=> x.courseId)}
 })
 res.json({
    allPurchases,
    CourseDetail
 })
});

module.exports = {
  CourseRoute: CourseRoute,
};
