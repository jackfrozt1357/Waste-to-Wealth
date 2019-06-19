const jwt = require('jsonwebtoken');
const User = require('../models/User');
const privatekey = require('../../config/secret').privatekey;
module.exports = (req, res, next) => {
    try {
        const token = req.body.authorization.split(" ")[1];
        var decoded = jwt.verify(token,privatekey);
        User.findOne({_id:decoded.id},(err,user)=>{
            if(err)
            {
                return res.status(401).json({success:"false",
                    Error: 'Auth failed'});
            }
            else if (user){
                req.user = decoded;
                next();
            }
            else{
                return res.status(401).json({success:"false",
                    Error: 'Auth failed'});
            }
        });
     
    } 
    catch (error) {
        return res.status(401).json({
            success:"false",Error:"failed auth"
        });
    }
};