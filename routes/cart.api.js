const express = require('express');
const router = express.Router();
const cartController= require('../controller/cartController');
const authController= require('../controller/authController');
router.post('/',authController.authenticate,cartController.addToCart);
router.get("/",authController.authenticate,cartController.getCartList)
router.delete("/:id",authController.authenticate,cartController.deleteCartItem)
router.put("/updateQty/:id",authController.authenticate,cartController.updateCartQty)








module.exports = router;

