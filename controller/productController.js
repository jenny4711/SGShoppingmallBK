const productController={};
const Product = require('../model/Product');
const PAGE_SIZE=5
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

// productController.getProducts=async(req,res)=>{
//   try{
//     const {page,name}=req.query
//     const cond=name?{name:{$regex:name,$options:'i'}}:{}
//     let query = Product.find(cond)
//     let response ={'status':'success'}
//     if(page){query.skip((page-1)*PAGE_SIZE).limit(PAGE_SIZE)
//      const totalItemNum = await Product.find(cond).count();
//     const totalPageNum =Math.ceil(totalItemNum/PAGE_SIZE);
//     response.totalPageNum=totalPageNum
//     }

//    const productList = await query.exec();

//    response.data=productList;
   

//     return res.status(200).json(response);
//   }catch(error){
//     res.status(400).json({status:'getProducts-fail',message:error.message});
//   }
// }

productController.getProducts = async (req, res) => {
  try {
      const { page, name } = req.query;
      const cond = name ? { name: { $regex: name, $options: 'i' } } : {};

      // 필터 조건에 재고 필터링 추가
      cond.$expr = {
          $gt: [
              { $size: { 
                  $filter: { 
                      input: { $objectToArray: "$stock" }, 
                      as: "item", 
                      cond: { $gt: ["$$item.v", 0] } 
                  }
              } }, 
              0
          ]
      };

      let query = Product.find(cond).lean();
      let response = { 'status': 'success' };

      if (page) {
          query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
          const totalItemNum = await Product.find(cond).count();
          const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
          response.totalPageNum = totalPageNum;
      }

      const productList = await query.exec();
      const filteredProducts = productList.map(product => {
        const filteredStock = {};
        for (const [key, value] of Object.entries(product.stock)) {
            if (value > 0) {
                filteredStock[key] = value;
            }
        }
        // Return product with filtered stock but keep other properties intact
        return { ...product, stock: filteredStock };
    });

    response.data = filteredProducts;

      return res.status(200).json(response);
  } catch (error) {
      res.status(400).json({ status: 'getProducts-fail', message: error.message });
  }
};

module.exports = productController;

productController.updateProduct=async(req,res)=>{
  try{
    const {id}=req.params;
    const {sku,name,size,image,category,description,price,stock,status}=req.body;
    if(!Product)throw new Error('Product not found');
    const product = await Product.findByIdAndUpdate({_id:id},{sku,name,size,image,category,description,price,stock,status},{new:true});
    res.status(200).json({status:'updateProduct-success',product});
    

  }catch(error){
    res.status(400).json({status:'updateProduct-fail',message:error.message});
  }
}

productController.editIsDeleted=async(req,res)=>{
 try{
  const {id}=req.params;
  const isDeleted = await Product.findById({_id:id}).isDeleted
  const product= await Product.findByIdAndUpdate({_id:id},{isDeleted:true,status:"inactive"},{new:true});
  console.log(product,'editIsDeleted')
  res.status(200).json({status:'editIsDeleted-success',product});
 }catch(error){
  res.status(400).json({status:'editIsDeleted-fail',message:error.message});
 }
}

productController.getProductDetail=async(req,res)=>{
  try{
    const {id}=req.params;
    const product = await Product.findById({_id:id});
    console.log(product,'getProductDetail')
    res.status(200).json({status:'getProductDetail-success',product});
  }catch(error){
    res.status(400).json({status:'getProductDetail-fail',message:error.message});
  }
}

productController.checkStock = async (item) => {
  const product = await Product.findById(item.productId);

  if (product.stock[item.size] < item.qty) {
    return {
      isVerify: false,
      message: `${product.name} 의 ${item.size} 재고가 부족합니다.`,
    };
  }
  const newStock = { ...product.stock };

  newStock[item.size] -= item.qty;
  product.stock = newStock;

  await product.save();

  return { isVerify: true };
};

productController.checkItemListStock = async (itemList) => {
  const insufficientStockItems = [];

  await Promise.all(
    itemList.map(async (item) => {
      const stockCheck = await productController.checkStock(item);
      if (!stockCheck.isVerify) {
        insufficientStockItems.push({ item, message: stockCheck.message });
      }

      return stockCheck;
    })
  );

  return insufficientStockItems;
};




module.exports = productController;