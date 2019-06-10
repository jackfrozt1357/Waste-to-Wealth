const express = require('express')
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3000;

const usersRoute = require('./api/routes/Users');
const Mongo_URI = require('./config/secret').MONGDB_URL;


mongoose.connect(Mongo_URI,{useNewUrlParser:true})
    .then(console.log('MongoDb started'))
    .catch((err)=>console.log("MongoDB Error\n"+err));



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended :false
}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method==="OPTIONS")
    {
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/user',usersRoute);



app.listen(PORT),console.log("started");