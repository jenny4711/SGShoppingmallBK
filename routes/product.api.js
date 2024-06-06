const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const productController = require('../controller/productController');


router.post('/',authController.authenticate, authController.checkAdminPermission,productController.createProduct);
router.get('/',productController.getProducts);
router.put('/:id',authController.authenticate, authController.checkAdminPermission,productController.updateProduct);
router.put('/isDeleted/:id',authController.authenticate, authController.checkAdminPermission,productController.editIsDeleted);
router.get('/:id',productController.getProductDetail);
module.exports = router;