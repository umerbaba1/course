const { Router}=require("express")
const CourseRoute=Router()

CourseRoute.get('/',(req,res)=>{
    res.json({
        msg:"all courses"
    })
})

CourseRoute.post('/purchase',(req,res)=>{
    res.json({
        msg:"Buy some course"
    })
})

CourseRoute.get('/purchases',(req,res)=>{
    res.json({
        msg:"Courses you have bought"
    })
})

module.exports={
    CourseRoute:CourseRoute
}