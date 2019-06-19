//@route Post /api/user/verification
//@desc verify users & grant permissions
//@access private
/** 

router.post('/verification',passport.authenticate('jwt', { session: false }),(req,res)=>{
    if(req.user.verificationpin==PermissionRequest.body.pin)
    {
       User.updateOne({_id:req.user.verificationpin},{verified:"1"})
    }

    // INSTRUCTIONS : on signup send mail to user
    //user client calls verify that takes in a pin
    // then if true send and empty array(or send success : true)
    //TODO use get phonenumber to use mailgun
});
/*
const accountSid = require('../../config/secret'.sid;
const authToken = require('../../config/secret').authtoken;
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({from: '+15017122661', body: rdata.verificationpin, to: req.body.phonenumber})
      .then(message => console.log(message.sid));
*/

/*
router.post('/verification',auth,(req,res)=>{
  /*  if(req.user.verificationpin==PermissionRequest.body.pin)
    {
       User.updateOne({_id:req.user.verificationpin},{verified:"1"})
    }

    // INSTRUCTIONS : on signup send mail to user
    //user client calls verify that takes in a pin
    // then if true send and empty array(or send success : true)
    //TODO use get phonenumber to use mailgun or twilo 

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
    
});*/
