var express = require('express');
var path = require('path');
const mongoose=require('mongoose')
const key=require('./config/key')
var product_Route = require('./routes/product_Route');
var user_Route = require('./routes/user_Route');
const errorMiddleware=require('./middleware/error')
var app = express();
const bodyp=require('body-parser')
const evalid = require('express-validator');

mongoose.connect(key.url, (err, db)=>{
    console.log("Connectiong to db")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyp.urlencoded({extended:true}))



app.use('/api/v1', product_Route);
app.use('/api/v1', user_Route)

app.use(errorMiddleware)
app.listen(8080)