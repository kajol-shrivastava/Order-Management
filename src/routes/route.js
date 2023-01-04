const express=require("express")
const {register,userLogin}=require("../controllers/customerController")
const {createOrder}=require("../controllers/orderController")
const {authentication}=require("../middlewares/auth")
const router=express.Router()

router.get("/",function(req,res){
    res.send("API is running")
})

router.post("/register",register)
router.post("/login", userLogin)

router.post("/order/:customerId",authentication,createOrder)



module.exports=router