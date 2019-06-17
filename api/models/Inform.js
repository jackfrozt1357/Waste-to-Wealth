const mongoose =require('mongoose');
const informSchema = new mongoose.Schema(
    {
        user :{
            type : mongoose.Schema.Types.ObjectId,
            ref :'User',
            required : true 
        },
        locationlat:{
            type:String,
            required : true
           //TODO MAKE LOCATION REQUIRED
           //TODO REMOVE ALL COMMENT 
        },
        locationlng:{
            type : String,
           required :true 
        },
        locationcity:{
            type : String,
            required : true
        
        },
        picture:{
            type : String,
            required :true
        },
        address : {
            type : String ,
            required :true
        },
        type:{
            type :String,
            required : true
        },
        time_sent :{
            type : Date ,
            default : Date.now
        },
        quantity :{
            type : String,
            required : true 
        }
        /*Distance :{
            type : String,
            required : true 
        }*/
    }
);

module.exports=mongoose.model('Inform',informSchema);