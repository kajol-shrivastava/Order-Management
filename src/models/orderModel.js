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
    totalPrice: {
        type: Number,
        required: true,
        comment: "Holds total price of all the items "
    },
    discount: {
        type: Number,
        default:0,
        comment: "Holds total number of items in the cart"
    },
    totalQuantity: {
        type: Number,
        required: true,
        comment: "Holds total number of quantity in the cart"
    },
    cancellable: { 
        type: Boolean, 
        default: true 
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