const mongoose=require("mongoose")

const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId

const UserSchema=  new Schema({
    email:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
})

const AdminSchema=  new Schema({
    email:{type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
})

const CourseSchema=  new Schema({
    creatorId:ObjectId,
    title:String,
    description:String,
    image:String,
    price:Number
})

const PurchaseSchema=  new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const UserModel=mongoose.model("user",UserSchema)
const AdminModel=mongoose.model("admin",AdminSchema)
const CourseModel=mongoose.model("course",CourseSchema)
const PurchaseModel=mongoose.model("purchase",PurchaseSchema)

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}