const { Router }=require("express")
const UserRoute=Router()
const { UserModel }=require("../db")
const jwt=require("jsonwebtoken")
const {z}=require("zod")
const bcrypt=require("bcrypt")






UserRoute.post('/signup',async(req,res)=>{

    const zodSchema=z.object({
        email:z.string().min(6).max(100).email(),
        password:z.string().min(3).max(20),
        firstname:z.string().min(3).max(20)
    })
    const zodSchemaprocess=zodSchema.safeParse(req.body)
    if(!zodSchemaprocess.success){
        res.json({
            message:"Inccorrect Entry",
            error:zodSchemaprocess.error
        })
    }
   const{email,password,firstname,lastname}=req.body
   try{
   const hashedpassword= await bcrypt.hash(password,8)
   await  UserModel.create({
    email:email,
    password:hashedpassword,
    firstname:firstname,
    lastname:lastname
   })
   res.json({
    message:"User Signed up"
   })
   }catch(err){
    res.json({
        message:"User already exist "
        
    })
    console.log(err)
   }
})

UserRoute.post('/signin',async(req,res)=>{
    const {email,password}=req.body
    try{
    const UserData=await UserModel.findOne({
        email:email,
    }) 
    if(!UserData){
        res.json({
            message:"User doesnot exist"
        })
    }
    const hashedpassword= await bcrypt.compare(password,UserData.password)

   if(UserData && hashedpassword){
    const token=jwt.sign({
        id:UserData._id
    },process.env.JSON_USER_TOKEN)
    res.json({
        token:token
    })
   }else{
    res.json({
        message:"Password Incorrect"
    })
   }
}catch(err){
   res.json({
    message:"Please signup again"
   })
   console.log(err)
}


   
})

module.exports  ={
UserRoute:UserRoute
} 