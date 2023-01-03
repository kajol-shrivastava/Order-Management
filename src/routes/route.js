const express=require("express")
const {register,userLogin}=require("../controllers/customerController")
const {createOrder}=require("../controllers/orderController")
const router=express.Router()

router.get("/",function(req,res){
    res.send("API is running")
})

router.post("/register",register)
router.post("/login", userLogin)

router.post("/order/:customerId",createOrder)



module.exports=router