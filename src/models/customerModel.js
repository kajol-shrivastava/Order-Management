const mongoose=require('mongoose')

const customerSchema = new mongoose.Schema({

    fname: {
      type: String, 
      required: true,
      trim:true
    },
    lname: {
      type:String, 
      required: true,
      trim:true
    },
    email: {
      type: String, 
      required:true, 
      unique:true,
      trim:true
    },
   
    phone: {
      type:String, 
      required:true, 
      unique:true,
      trim:true
    }, 
    password: {
      type:String,
      required:true, 
      min: 8, 
      max: 15,
      trim:true
    }, 
    orderNo:{
        type:Number,
        default:0
    },
    customerType:{
        type:String,
        enum:["regular", "gold", "platinum"],
        default:"regular"
    }
  }, { timestamp:true})


  module.exports= mongoose.model('customer', customerSchema)
