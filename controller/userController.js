const User=require('../model/User');

const bcrypt=require('bcryptjs');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const userController={}

userController.createUser = async (req, res) => {
 try{
  const {email,password,name,level}=req.body;
  console.log(req.body,'reqbody')
  console.log(email)
  const user = await User.findOne({email});
  if(user)throw new Error('user already exists');
  const salt = await bcrypt.genSaltSync(10);
  const newPassword= await bcrypt.hash(password,salt);
  const newUser = new User({email,password:newPassword,name,level:level?level:'customer'});
  await newUser.save();
  return res.status(200).json({status:'createUser-success',data:newUser});

 }catch(error){
  res.status(500).json({status:'createUser-fail',message:error.message});
 }
}

userController.login=(req,res)=>{}










module.exports = userController;