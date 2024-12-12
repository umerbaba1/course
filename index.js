const express=require("express")
const mongoose=require("mongoose")
const {UserRoute}=require("./routes/user")
const {CourseRoute }=require("./routes/course")
const { AdminRouter } = require("./routes/admin")

const app=express()

app.use(express.json())

app.use('/api/v1/user',UserRoute)
app.use('/api/v1/admin',AdminRouter)
app.use('/api/v1/course',CourseRoute)




async function main() {
   await mongoose.connect("mongodb+srv://umer:7JeFHoBqTX4PbdIp@amazon.eitro.mongodb.net/course-app")
   console.log("Connected To Database")
   app.listen(4000,()=>{
    console.log("http://192.168.29.252:4000")
   })
   
}
main()



