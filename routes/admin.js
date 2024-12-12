const { Router}= require("express")
const  AdminRouter=Router()

AdminRouter.post('/signup',(req,res)=>{
    res.json({
        message:"Signup completed"
    })
})

AdminRouter.post('/signin',(req,res)=>{
    res.json({
        message:"Signup completed"
    })
})

AdminRouter.post('/course',(req,res)=>{
    res.json({
        message:"Signup completed"
    })
})

AdminRouter.put('/course',(req,res)=>{
    res.json({
        message:"Signup completed"
    })
})

AdminRouter.get('/course/all',(req,res)=>{
    res.json({
        message:"Signup completed"
    })
})

module.exports={
AdminRouter
}
