const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    customerId: {
        type: ObjectId,
        ref: 'customer',
        required: true,
        trim: true
    },
    productname:{
        type:String,
        required:true,
    },
    totalprice: {
        type: Number,
        required: true,
        comment: "Holds total price of all the items "
    },
    discount: {
        type: Number,
        default:0,
    },
    finalAmount:{
        type:Number,
        default:0
    },
    cancellable: { 
        type: Boolean, 
        default: false 
    },
    isCancelled:{
        type:Boolean,
        default:false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema)