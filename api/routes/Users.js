const express = require('express');
const router = express.Router();
const isvalid = require('../middleware/isvalidmail');
const User = require('../models/User');
const numverify= require('../../config/numverify');
const Perrors = require('../Errors')
const bcrypt = require('bcrypt');

//@route  POST /User
//@desc   create user account
//@access public
router.post('/',(req,res)=>{
    if (!req.body.Fullname || !req.body.Email || !req.body.Password || !req.body.Phone_Number) {
        res.json({ success: false, Error: Perrors.Required });
    }else{
        query={number:req.body.Phone_Number};
        numverify.validate(query,(err,result)=>{
            if(err) {res.status(401).json({Errors:Perrors.Unknown});}
            if(result.valid==true){
                User.findOne({Email:req.body.Email},(err,result)=>{
                    if(err){res.status(401).json({Error:Perrors.Unknown});}
                    if (result.length>0){
                        res.status(400).json({Error:Perrors.ALEmail});
                    }else {
                        if(isvalid(req.body.Email))
                        {
                            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                               var names = (req.body.Fullname).split(" ")
                                var newUser = new User(
                                    {
                                        Email :req.body.Email,
                                        Password :req.body.Password,
                                        Phone_Number:req.body.Phone_Number,
                                        Fistname : names[0],
                                        Lastname : names[1]
                                    }
                                );
                                newUser.save((err,user)=>{
                                    if(err){res.json({Error:Perrors.Unknown});}
                                    else{
                                        res.status(201).json({
                                            Email:user.Email,
                                            Type :user.Type,
                                            Verified :user.Verified,
                                            Phone_Number:user.Phone_Number
                                        });
                                    }
                                });

                                
                              });
                        }
                        else {
                            res.status(301).json({Error:Perrors.IEmail});
                        }
                    }
                    
                })
            }
        })
        
    }
    
})


module.exports = router;