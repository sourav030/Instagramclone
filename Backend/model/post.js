const mongoose = require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
       
        body:{
            type: String,
            required: true
        },
        photo:{
            type:String,
            required: true
        },
        likes:[{type:ObjectId,
            ref:"User"
        }],
        comments:[
            
            {
                comment:{type: String},
                postedBy:{type: ObjectId, ref:"User"}
            }
            
        ],
        
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
})
module.exports = mongoose.model('Post', postSchema)