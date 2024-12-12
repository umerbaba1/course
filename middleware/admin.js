const jwt=require("jsonwebtoken")

function AdminMiddleware(req,res,next){
    const token=req.headers["token"]
    try{
    const decodedtoken=jwt.verify(token,process.env.JSON_ADMIN_TOKEN)
    if(decodedtoken){
        req.adminId=decodedtoken.id
        next()
    }else{
        res.json({
            message:"Please Login "
        })
    }
}catch(err){
    res.json({
        message:"Sign in again"
    })
}
}

module.exports={
 AdminMiddleware
}