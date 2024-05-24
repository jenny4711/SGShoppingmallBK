const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    shipTo: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.ObjectId,
            ref: 'Product',
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]

    
   
}, {timestamps: true});

orderSchema.methods.toJSON=function(){
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}

const Order= mongoose.model('Order', orderSchema);
module.exports = Order;