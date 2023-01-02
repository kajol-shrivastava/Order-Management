const express=require('express')
const { default: mongoose } = require("mongoose");
const route = require("./routes/route.js");
mongoose.set('strictQuery', true);


const app=express()

app.use(express.json()); // tells the system that you want json to be used

// mongoDb connection
mongoose
  .connect(
    "mongodb+srv://kajolshrivastava:mongo%401999@cluster0.hzs17.mongodb.net/Order_Management",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

// Initial route
app.use("/", route);

app.listen(process.env.PORT||3000,function(){
    console.log("connected to port ",process.env.PORT||3000)
})