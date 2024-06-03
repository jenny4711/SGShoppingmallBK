const productController={};
const Product = require('../model/Product');

productController.createProduct=async()=>{
  try{
    const {suk,name,size,image,category,description,price,stock,status}=req.body;
    const product = new Product ({suk,name,size,image,category,description,price,stock,status});
    await product.save();
    return res.status(200).json({status:'createProduct-success',product});
  }catch(error){
    res.status(400).json({status:'createProduct-fail',message:error.message});
  }

}




module.exports = productController;