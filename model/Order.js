const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = require('./Cart');
const orderSchema = new Schema({
    shipTo: {
        type: Object,
        required: true
    },
    contact: {
        type: Object,
        require: true
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    orderNum: {
            type: String,
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
        },
        
    }]

    
   
}, {timestamps: true});

orderSchema.methods.toJSON=function(){
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}
orderSchema.post('save',async function(){
    const cart = await Cart.findOne({userId:this.userId});
    cart.items=[];
    await cart.save()
})

const Order= mongoose.model('Order', orderSchema);
module.exports = Order;