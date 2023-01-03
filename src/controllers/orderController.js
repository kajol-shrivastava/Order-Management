const orderModel=require("../models/orderModel")
const customerModel=require("../models/customerModel")
const { isValid, isValidObjectId,
    validName, isValidMail,
    isValidMobile, isValidRequest,
    isValidPassword,} = require("../validator/validator")


const createOrder=async function(req,res){
    try{
        let customerId=req.params.customerId
        if(!isValidObjectId(customerId)){
            return res.status(400).send({ status: false, msg: "please send a valid customer Id" })

        }

        let customer=await customerModel.findOne({_id:customerId})
        //console.log(customer)
        if(!customer){
            return res.status(404).send({status:false,msg:"customer details not found"})
        }

        
        let { productname , totalprice, cancellable} = req.body

        if (!isValidRequest(req.body)) {
            return res.status(400).send({ status: false, msg: "Please enter details for order creation." })
        }

        if(!isValid(productname)){
            return res.status(400).send({status:false,msg:"Please send name of the product"})
        }

        if(!isValid(totalprice)){
            return res.status(400).send({status:false,msg:"Please send name of the product price"})
        }

        let {orderNo,customerType}=customer
        let discount,finalAmount;

        orderNo+=1
        if(orderNo<10){
            if(orderNo==9){
                console.log("You have placed 9 orders with us. Buy one more stuff and you will be promoted to Gold customer and enjoy 10% discounts!")
            }
            discount=0
            finalAmount=totalprice
        }

        if(orderNo>=10&&orderNo<=19){
            if(orderNo===10){
                customerType="Gold"
            }
            if(orderNo==19){
                console.log("You have placed 19 orders with us. Buy one more stuff and you will be promoted to Platinum customer and enjoy 20% discounts!")
            }

            discount=totalprice*0.1
            finalAmount=totalprice-discount
           
        }

        if(orderNo>=20){
            if(orderNo===20){
                customerType="platinum"
            }
            
            discount=totalprice*0.2
            finalAmount=totalprice-discount
           
        }
        let updatedcustomer=await customerModel.findOneAndUpdate({_id:customerId},{customerType:customerType,orderNo:orderNo})

        // if(cancellable&&cancellable==true){
        //     cancellable
        // }
        let orderDetail={customerId,productname,totalprice,discount,finalAmount}
        let newOrder= await orderModel.create(orderDetail)
        newOrder["_doc"].customerDetails=updatedcustomer
        return res.status(200).send({status:true,msg:"Order placed Successfully",data:newOrder})


    }
    catch(err){
        res.status(500).send({ status: false, message: err.message })

    }
}

module.exports={createOrder}
