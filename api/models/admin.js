const mongoose = require('mongoose')
const { Schema} =mongoose

const adminSchema = new Schema({
    Fullname : String,
    Username: {
        type : String,
        unique: true
    },
    Password : String,
   
})
const AdminModel =mongoose.model('Admin',adminSchema)
module.exports=AdminModel;