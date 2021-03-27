const mongoose=require("mongoose");
const schema=mongoose.Schema;

const User=new schema({
    email:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        required:true
    },
    verification_string:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("users",User);