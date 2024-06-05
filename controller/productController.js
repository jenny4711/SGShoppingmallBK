const productController={};
const Product = require('../model/Product');
const PAGE_SIZE=1
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

productController.getProducts=async(req,res)=>{
  try{
    const {page,name}=req.query
    const cond=name?{name:{$regex:name,$options:'i'}}:{}
    let query = Product.find(cond)
    let response ={'status':'success'}
    if(page){query.skip((page-1)*PAGE_SIZE).limit(PAGE_SIZE)
     const totalItemNum = await Product.find(cond).count();
    const totalPageNum =Math.ceil(totalItemNum/PAGE_SIZE);
    response.totalPageNum=totalPageNum
    }

   const productList = await query.exec();
   response.data=productList;
   console.log(response,'responseProduct')
    return res.status(200).json(response);
  }catch(error){
    res.status(400).json({status:'getProducts-fail',message:error.message});
  }
}




module.exports = productController;