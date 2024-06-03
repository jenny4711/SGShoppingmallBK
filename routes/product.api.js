const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const productController = require('../controller/productController');


router.post('/',authController.authenticate, authController.checkAdminPermission,productController.createProduct);


module.exports = router;