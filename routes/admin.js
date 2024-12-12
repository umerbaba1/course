const { Router } = require("express");
const AdminRouter = Router();
const { AdminModel, CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { AdminMiddleware } = require("../middleware/admin");

AdminRouter.post("/signup", async (req, res) => {
  const zodSchema = z.object({
    email: z.string().min(6).max(100).email(),
    password: z.string().min(3).max(20),
    firstname: z.string().min(3).max(20),
  });
  const zodSchemaprocess = zodSchema.safeParse(req.body);
  if (!zodSchemaprocess.success) {
    res.json({
      message: "Inccorrect Entry",
      error: zodSchemaprocess.error,
    });
  }
  const { email, password, firstname, lastname } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 8);
    await AdminModel.create({
      email: email,
      password: hashedpassword,
      firstname: firstname,
      lastname: lastname,
    });
    res.json({
      message: "Admin Signed up",
    });
  } catch (err) {
    res.json({
      message: "Admin already exist ",
    });
    console.log(err);
  }
});

AdminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const AdminData = await AdminModel.findOne({
      email: email,
    });
    if (!AdminData) {
      res.json({
        message: "Admin doesnot exist",
      });
    }
    const hashedpassword = await bcrypt.compare(password, AdminData.password);

    if (AdminData && hashedpassword) {
      const token = jwt.sign(
        {
          id: AdminData._id,
        },
        process.env.JSON_ADMIN_TOKEN
      );
      res.json({
        token: token,
      });
    } else {
      res.json({
        message: "Password Incorrect",
      });
    }
  } catch (err) {
    res.json({
      message: "Please signup again",
    });
    console.log(err);
  }
});

AdminRouter.use(AdminMiddleware);

AdminRouter.post("/course", async (req, res) => {
  const creatorId = req.adminId;
  const { title, description, price, image } = req.body;
  const course = await CourseModel.create({
    title,
    description,
    price,
    image,
    creatorId: creatorId,
  });
  res.json({
    message:"Course created",
    courseId:course._id
  })
});

AdminRouter.put("/course", async(req, res) => {
    const Id=req.adminId
    const { title, description, price, image ,courseId} = req.body;
     await CourseModel.findOneAndUpdate(
        {
            _id:courseId,
           creatorId:Id
        },
        {
      title,
      description,
      price,
      image
    });
    res.json({
      message:"Course Updated",
    })
});

AdminRouter.get("/course/all", async(req, res) => {
    const Id = req.adminId;
    const AllCourse= await CourseModel.find({
        creatorId:Id
    })
    res.json(AllCourse)

});

module.exports = {
  AdminRouter,
};
