const express = require('express');
const router = express.Router();
const Inform = require('../models/Inform');
const passport = require('passport');
const perrors = require('../Errors');
const axios =require('axios');
const locationapi = require('../../config/secret').locationkey;
const auth = require('../middleware/auth');

//TODO Listadd inform
//get all your inform


//@router POST /api/inform
//@desc recre8tors to inform intermidiaries
//@access private
router.post('/',auth,(req,res)=>{
    if(!req.body.lat|| !req.body.lng || !req.body.quantity || !req.body.type || !req.body.picture || !req.body.address )
    {
        //the picture is a cloudinary link
        res.json({success:"false",Error : perrors.Required});
        
    }
    else {
        if (!(req.user.verified===1))//remve ! for testing
        {
            res.json({success:"false",Error:"You are not verified"});

        }
        else{
          if(!req.user.type===0)//if not recr8tor
          {
              res.json({success:"false",Error :"Invalid action "})
          }
          else
          {
              //get location city and save
              axios.get('https://eu1.locationiq.com/v1/reverse.php?key='+locationapi+'&lat='+req.body.lat+'&lon='+req.body.lng+'&format=json')
                .then(({data})=>{
                    newentry = new Inform({
                        user : req.user._id,
                        locationlat : req.body.lat,
                        locationlng :req.body.lng,
                        quantity: req.body.quantity,
                        type : req.body.type,
                        picture : req.body.picture,
                        address:req.body.address,
                        locationcity : data.address.state

                    });
                   newentry.save()
                    .then((complete)=>{
                        res.json({success:"true"})

                    })
                    .catch((err)=>res.json({success:"false",Error:perrors.Unknown+err}));

                })
                .catch((err)=>res.json({sucess:"false",Error:perrors.Unknown}));
              
          }
        }
        
    }
   
});

//@route GET /api/inform
//@desc  fetch a user reports(informs)
//@access private 

router.get('/',auth,(req,res)=>{
    
    Inform.find({user:req.user._id})
        .then((result)=>{
            res.json({result})

        })
        .catch((err)=>{
            res.json({sucess:"false",Error:perrors.Unknown})
        });
});
module.exports=router;