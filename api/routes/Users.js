const express = require('express');
const passport = require('passport');
const router = express.Router();
const isvalid = require('../middleware/isvalidmail');
const User = require('../models/User');
//const numverify= require('../../config/numverify'); TODO add correct number verification
const Perrors = require('../Errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privatekey = require('../../config/secret').privatekey;
const auth = require('../middleware/auth');



//@route  POST /User
//@desc   create user account
//@access public
router.post('/',(req,res)=>{
    if (!req.body.fullname || !req.body.email || !req.body.password || !req.body.phonenumber || !req.body.type) {
        res.json({ success: "false", Error: Perrors.Required });
    }else{
        if(isvalid(req.body.email))
        {
            User.find({ $or: [ { email: req.body.email }, { phonenumber:req.body.phonenumber} ] },(err,result)=>{
                if(err)
                {
                    res.json({ success: "false", Error: Perrors.Unknown + "did not find" });
                }
                else
                {
                    if (result.length>0)
                    {
                        res.json({ success: "false",Error:"Phone Number or Email already in use"});
                    }
                    else
                    {
                        bcrypt.hash(req.body.password,10, function(err, hash) {
                                if(err)
                                {
                                    res.json({ success: "false", Error: Perrors.Unknown + "did not hash" });
                                }
                                else
                                {
                                    names = (req.body.fullname).split(" ");
                                    var Newuser = new User(
                                        {
                                            email : req.body.email,
                                            password : hash,
                                            phonenumber : req.body.phonenumber,
                                            firstname : names[0],
                                            lastname : names[1],
                                            type : req.body.type,
                                            lat : req.body.lat,
                                            lng: req.body.lng

                                        });
                                        
                                    Newuser.save()
                                    .then((output)=>{
                                            jwt.sign({id:output._id,email:output.email,fname:output.firstname,createdAt :Date.now()},privatekey,{expiresIn:"10h"},(err,token)=>{
                                                if(err)
                                                {
                                                    res.json({success:"false",Error:Perrors.Unknown})
                                                }else{
                                                    res.json({success:"true",email:output.email,firstname:output.firstname,lastname:output.lastname,phonenumber:output.phonenumber,type:output.type,verfied:output.verified,access_token:"Bearer " + token})
                                                }
                                            });
                                        })
                                        
                                        .catch((err)=>{
                                            if(err){res.json({ success: "false", Error: Perrors.Unknown});}});
                                }
                          });//TODO PUT CORRECT ERRORS CODE
                    }
                }
            })
        }
        else {
            res.json({ success: "false", Error: Perrors.IEmail});
        }

    }
});


//@route Post /user/login
//@desc to login
//@access public


router.post('/login',(req,res)=>{
    if(!req.body.email || !req.body.password)
    {
        res.json({success:"false",Error:Perrors.Required});
    }
    else
    {
        User.findOne({email:req.body.email},(err,rdata)=>{
            if(err||!rdata) 
            {
                res.json({success:"false",Error:"Invalid"});
            }
            else
            {
                bcrypt.compare(req.body.password,rdata.password, function(err,isvalid) {
                    // res == true
                    if(err || isvalid==false){
                        res.json({success:"false",Error:"Auth failed"});
                    }
                    else{
                        jwt.sign({id:rdata._id,email:rdata.email,fname:rdata.fname,created :Date.now()},privatekey,{expiresIn:"10h"},(err,token)=>{
                            if(err)
                            {
                                res.json({success:"false",Error:"Something went wrong"});
                            }
                            else{
                                res.json({success:"true",email:rdata.email,firstname:rdata.firstname,lastname:rdata.lastname,type:rdata.type,phonenumber:rdata.phonenumber,verified:rdata.verified,access_token:"Bearer "+token});
                                //start here
                            }
                        });
                    }
                });
            }
        });
            
    }
    
});
router.post('/verification',auth,(req,res)=>{
  /*  if(req.user.verificationpin==PermissionRequest.body.pin)
    {
       User.updateOne({_id:req.user.verificationpin},{verified:"1"})
    }

    // INSTRUCTIONS : on signup send mail to user
    //user client calls verify that takes in a pin
    // then if true send and empty array(or send success : true)
    //TODO use get phonenumber to use mailgun or twilo */

    if(req.user.email==req.body.email)


    try {
        User.updateOne(
           { email : req.user.email },
           { $set: {  verfied: "1" } },
           (err,aw)=>{
               res.json(aw);
           }

        );
     } catch (e) {
        res.status(401).json({Success:"false",Error:"verifcation failed"});
     }
    
});

module.exports = router;