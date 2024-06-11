const express = require("express");
const authController = require('../controller/authController');
const router = express.Router();
const orderController=require("../controller/orderController")
router.post("/",authController.authenticate,orderController.createOrder)
router.get("/",authController.authenticate,orderController.getOrderList)
router.get("/all",authController.authenticate,authController.checkAdminPermission,orderController.getAllOrderList)
router.put("/:id",authController.authenticate,authController.checkAdminPermission,orderController.updateOrder)

module.exports=router