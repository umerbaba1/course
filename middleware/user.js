const jwt=require("jsonwebtoken")

function UserMiddleware(req,res,next){
    const token=req.headers["token"]
    const decodedtoken=jwt.verify(token,process.env.JSON_USER_TOKEN)
    if(decodedtoken){
        req.userId=decodedtoken.id
        next()
    }else{
        res.json({
            message:"Please Login "
        })
    }
}

module.exports={
    UserMiddleware
}