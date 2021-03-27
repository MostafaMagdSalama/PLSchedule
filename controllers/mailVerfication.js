const User=require("../models/User");


module.exports.verify_get=(req,res)=>{
    req.session.message={
        type:'success',
        message:'Your Account has been Verified'
    }
const random_url=req.params.test;
User.updateOne({verification_string:random_url},{verified:true})
.then(data=>{
    res.send(data);
})
.catch(err=>res.send(err))
res.redirect('/')
};
