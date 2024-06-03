const authController={}
const User=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();
authController.loginWithEmail=async (req, res) => {
  try{
    const {email,password}=req.body;
   let user = await User.findOne({email});

    if(!user)throw new Error('Invalid email or password');
 const isMatch = await bcrypt.compare(password,user.password)
 if(isMatch){
  const token = await user.generateToken();
  return res.status(200).json({status:'login-success',data:{user,token}});
 }else{
  throw new Error('Invalid email or password');
 }


  }catch(error){
    console.log(error,'loginfail')
    res.status(400).json({status:'login-fail',message:error.message});
  }



}

authController.authenticate=async(req,res,next)=>{
  try{
    const tokenString = req.headers.authorization
    if(!tokenString)throw new Error('No token provided');
    const token = tokenString.replace('Bearer ','');
     jwt.verify(token,process.env.JWT_SECRET_KEY,(error,payload)=>{
      if(error)throw new Error('Invalid token');
      req.userId = payload._id;
    next();
    });



  }catch(error){
    res.status(400).json({status:'authenticate-fail',message:error.message});
  }
}



module.exports = authController;