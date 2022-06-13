const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

let orderSchema = new mongoose.Schema( {
    
        userId:{
            type:ObjectId,
            ref:"myuser"
        },
        productId: {
            type:ObjectId,
            ref:"myproduct"
        },
        amount:Number,
        date:String,
    
}, { timestamps: true });

module.exports = mongoose.model('myorder', orderSchema)
