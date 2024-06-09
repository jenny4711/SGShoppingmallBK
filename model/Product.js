const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    sku: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: Array,
        require: true
    },
    stock: {
        type: Object,
        require: true
    },
    status: {
        type: String,
        default: "active"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    

    
   
}, {timestamps: true});



productSchema.methods.toJSON=function(){
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}

const Product= mongoose.model('Product', productSchema);
module.exports = Product;