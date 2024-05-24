const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId:{
        type:mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    items:[{
        productId:{
            type: mongoose.ObjectId,
            ref: 'Product',
            required: true
        },
        qty:{
            type: Number,
            required: true
        },
        size:{
            type: String,
            required: true
        }
    }]

    
   
}, {timestamps: true});

cartSchema.methods.toJSON=function(){
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}

const Cart= mongoose.model('Cart', cartSchema);
module.exports = Cart;