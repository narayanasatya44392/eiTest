const express = require('express')
const mongosse = require('mongoose')

const User = require('./userModel');

const app = express();
let bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// connecton my bad 
mongosse.connect('mongodb+srv://satya_51:Ojas@1525@testdb-njzs1.gcp.mongodb.net/test', { useNewUrlParser: true ,useUnifiedTopology: false}).then(data => {
    console.log("connection successfully Done");
}).catch(e=> {
    console.log(e)
    console.log('connection error....');
})


// parse application/json
app.use(bodyParser.json())


// GET ALL USER 
app.get('/api/users',(req,res)=>{
    User.find({},(err , data) => {
        if(!err)
        res.json({"status" : 1 , message : "all users" ,data : data})
        res.json({"status" : 0 , message : "problem whiloe fetching users list"})
    });
});

// GET USER BY ID 
app.get('/api/user/:id',(req,res)=>{
    console.log(req.params.id);
    User.findOne({id : req.params.id},(err , data) => {
        if(!err)
        res.json({"status" : 1 , message : "user details" ,data : data})
        res.json({"status" : 0 , message : "problem whiloe fetching users list"})
    });
});

// FIND USER AND UPDATE USER
app.put('/api/user/:id',(req,res)=>{
    console.log(req.params.id);
    let updateObj  = req.body ? req.body : {};
    User.findOneAndUpdate({id : req.params.id},updateObj, {new : true , upsert :true},(err , data) => {
        if(!err)
        res.json({"status" : 1 , message : "updation success" , data : data})
        res.json({"status" : 0 , message : "problem while updating  user"})
    });
});

// REMOVE USER
app.delete('/api/user/:id',(req,res)=>{
    console.log(req.params.id);
    User.remove({id : req.params.id},(err , data) => {
        if(!err)
        res.json({"status" : 1 , message : "deleted user record" })
        res.json({"status" : 0 , message : "problem while delete user"})
    });
});

// CREATE USER 
app.post('/api/user',(req,res)=>{
    if(req && req.body){
        User.find().count(function(err , count){
            if (!err){
                let id = count + 1 ;
                req['body'].id = id ;
                let createUser = new User(req.body);
                createUser.save();
            }
            res.json({"status" : 0 , message : "problem while fetching details"})
        })
        res.json({"status" : 1 , message : "user created successfully"})
    }else{
        res.json({"status" : 0 , message : "invalid input data"})
    }
})

// Mongo db text search query 

// search string 
app.get('/api/typeahead/:input',(req,res)=>{
    console.log(req.params.input);
    User.find({$text  :{ $search :req.params.input }}).exec((err , data) => {
        if(!err)
        res.json({"status" : 1 , message : "search results are" ,data : data})
        res.json({"status" : 0 , message : "problem while searchning results "})
    })
});


// server
app.listen(3001,function(){
    console.log('Hi HELLO');
});




