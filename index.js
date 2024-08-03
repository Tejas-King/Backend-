  const express =require("express")
  const cors =require("cors")
  const mongoose =require("mongoose")

  const app=express()
  app.use(cors())
  app.use(express.json())

  const PORT=process.env.PORT || 8000

  //schema
  const schemadata=mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
  },
  {timestamps :true})
  
const userModel =mongoose.model("Users",schemadata)
//
  app.get("/",async(req,res)=>{
    const data= await userModel.find({})
    res.json({success: true,data: data})
  })

//create data
app.post("/create",async(req,res)=>{
    console.log(req.body)
  const data=new userModel(req.body)
  await data.save()  
    res.send("added or posted")
})
//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest}=req.body
    console.log(rest)
   const data = await userModel.updateOne({_id :req.body.id},rest)
    res.send("added or posted")

})
//delete
app.delete("/delete",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const data = await userModel. deleteOne({_id :req.body.id})
})
  mongoose.connect("mongodb://localhost:27017/deals")
  .then(()=>{console.log("connect DB")
    app.listen(PORT,()=>console.log("server is running")) 
  })
  .catch(()=>console.log(err))

  