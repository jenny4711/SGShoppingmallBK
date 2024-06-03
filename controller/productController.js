const productController={};
const Product = require('../model/Product');

productController.createProduct=async(req,res)=>{
  try{
    console.log(req.body,'createProduct')
    const {sku,name,size,image,category,description,price,stock,status}=req.body;
    const product = new Product ({sku,name,size,image,category,description,price,stock,status});
    await product.save();
    return res.status(200).json({status:'createProduct-success',product});
  }catch(error){
    console.log(error,'createProduct-fail')
    res.status(400).json({status:'createProduct-fail',message:error.message});
  }

}




module.exports = productController;