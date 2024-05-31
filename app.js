
//user
//email , password, name, level
//product
//suk,name,image,descrition,price,stock,category,status,isDeleted
//cart
//userId,items[{productId,quantity,size}],
//order
// shipTo,contact,userId,items[{productId,quantity,size,price}]





const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const indexRouter =require('./routes/index');
require('dotenv/config');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api',indexRouter);
const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch((err)=>console.log('DB connection fail',err));


app.listen(process.env.PORT || 5000,()=>{
    console.log('Server is running on port 5000');
})
