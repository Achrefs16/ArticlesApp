const mongoose = require('mongoose')
const { Schema} =mongoose


const postSchema =new Schema({
  
   userId:String,
    Fullname:{
        type : String,
      
    },
    Title:String,
    Summary:String,
    Content:String,
    cover:String,
  
},

{
    timestamps:true,
    });

const postModel =mongoose.model('Post',postSchema)
module.exports=postModel;