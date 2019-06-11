const mongoose =require('mongoose');
const informSchema = new mongoose.Schema(
    {
        User :{
            type : mongoose.Schema.Types.ObjectId,
            ref :'User',
            required : true 
        },
        Locationlat:{
            type:String,
          // required : true
           //TODO MAKE LOCATION REQUIRED
           //TODO REMOVE ALL COMMENT 
        },
        Locationlng:{
            type : String,
           // required :true 
        },
        Locationcity:{
            type : String,
            //required
        },
        Picture:{
            type : String,
            //required :true
        },
        Address : {
            type : String ,
            required :true
        },
        Time_sent :{
            type : Date ,
            default : Date.now
        },
        Quantity :{
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