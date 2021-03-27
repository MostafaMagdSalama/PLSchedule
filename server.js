const express =require("express");
const test=require("./routes/reg");
const body_parser=require('body-parser');
const session=require('express-session');
const {verify}=require('./connections/mailhandle/mailHandler');
const app=express();
require('dotenv').config()
// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }))
// parse application/json
app.use(body_parser.json())
 
// session middleware
app.use(session({
    secret:'mostafa'

}))

// load static files
app.use(express.static('public'))
// app.use(express.json());

// middleware to store sessions in locals
app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    res.locals.message2=req.session.message2;
     delete req.session.message;
    next();
});

// set ejs as default view engin
app.set('view engine','ejs')
// load routes
app.use(test);

// connect to database 
require("./connections/BDConnection")

// require('./remiderEngine/engine')
// verify()






const port=3000||process.env.PORT;
app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})