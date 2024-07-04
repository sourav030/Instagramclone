const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Photo:{
            type:String,
            
    },
    followers:[
        {
            type: ObjectId,
            ref:"User"
        }
    ],
    folllowing:[
        {   
            type: ObjectId,
            ref:"User"
        }
    ]
   
})

module.exports= mongoose.model('User', userSchema)