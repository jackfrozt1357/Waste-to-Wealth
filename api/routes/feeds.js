const express =require('express');
const router = express.Router();
const Inform = require('../models/Inform');
const passport = require('passport');
const axios = require('axios');
const locationapi = require('../../config/secret').locationkey;
const per = require('../Errors');



//@route GET /api/feeds
//@desc get informs of recr8tor in same city and distance
//@access private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
        if(req.user.type === 1)//check if intermidairy
        {

    
          if (req.user.verified==1)
          {
            axios.get('https://eu1.locationiq.com/v1/reverse.php?key='+locationapi+'&lat='+req.body.lat+'&lon='+req.body.lng+'&format=json')
                .then(
                    ({data})=>{
                        Inform.find({locationcity:data.address.state})
                            .populate('user') 
                            
                            .exec((err, feeds)=> {
                                if (err){
                                    res.json({success:"false",Error:"unknown"})
                                }
                                else{
                                   res.json({feeds})
                                    
                                }
                              });
                    }
                )
                .catch((err)=>{res.json({success:"false",msg:"data fetch failed"})});

}
          else{
            res.json({success:"false",msg:"You are not verified"});
          }
            

        }
        else{
            res.json({success:"false",Error:"Unathorized action"});
        }
});

module.exports = router;