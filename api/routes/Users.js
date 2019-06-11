const express = require('express');
const router = express.Router();
const isvalid = require('../middleware/isvalidmail');
const User = require('../models/User');
const numverify= require('../../config/numverify');
const Perrors = require('../Errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@route  POST /User
//@desc   create user account
//@access public
router.post('/',(req,res)=>{
    if (!req.body.fullname || !req.body.email || !req.body.password || !req.body.phonenumber) {
        res.json({ success: "false", Error: Perrors.Required });
    }else{
        if(isvalid(req.body.email))
        {
            User.find({ $or: [ { email: req.body.email }, { phonenumber:req.body.phonenumber} ] },(err,result)=>{
                if(err)
                {
                    res.json({ success: "false", Error: Perrors.Unknown });
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
                                    res.json({ success: "false", Error: Perrors.Unknown });
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
                                            type : req.body.type

                                        });
                                    Newuser.save().then((output)=>{res.json({output});})
                                        .catch((err)=>{res.json({ success: "false", Error: Perrors.Unknown });});
                                }
                          });
                    }
                }
            })
        }
        else {
            res.json({ success: "false", Error: Perrors.IEmail});
        }

    }
});

module.exports = router;