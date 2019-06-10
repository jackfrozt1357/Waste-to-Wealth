const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema(
    {   
        Email:{
            type:String,
            required : true,
            match :/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            
        },
        Firstname:{
            type:String,
            required : true,
            
        },
        Lastname:{
            type:String,
            required : true,
            
        },
        Password:{
            type:String,
            required : true
        },
        Type :{
            type : Number,
            required : true
        },
        Phone_Number:{
            type : String,
            required : true 
        },
        Verified :{
            type : String,
            default :"0"
        }
        ,
        Location :{
            type : String,
           // required : true
        
        }
        

    }
);

module.exports=mongoose.model('User',userSchema);