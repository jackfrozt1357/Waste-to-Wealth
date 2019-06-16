const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema(
    {   
        email:{
            type:String,
            required : true,
            match :/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            
        },
        firstname:{
            type:String,
            required : true,
            
        },
        lastname:{
            type:String,
            required : true,
            
        },
        password:{
            type:String,
            required : true
        },
        type :{
            type : Number,
            required : true //"0" rec8or or "1" intermidiary
        },
        phonenumber:{
            type : String,
            required : true 
        },
        verified :{
            type : String,
            default :"0" //value is one when 1 when verified
        }
        ,
        location :{
            type : String,
           // required : true
        
        }
        

    }
);

module.exports=mongoose.model('User',userSchema);