const authController={}
const User=require('../model/User');
const bcrypt=require('bcryptjs');
authController.loginWithEmail=async (req, res) => {
  try{
    const {email,password}=req.body;
   let user = await User.findOne({email});
 console.log(email,'email')
    if(!user)throw new Error('Invalid email or password');
 const isMatch =await bcrypt.compare(password,user.password)
 if(isMatch){
  const token = await user.generateToken();
  return res.status(200).json({status:'login-success',data:{user,token}});
 }


  }catch(error){
    console.log(error,'loginfail')
    res.status(400).json({status:'login-fail',message:error.message});
  }



}





module.exports = authController;