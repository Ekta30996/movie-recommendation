require('../db-connection/connection')
const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    genre:{
        type:String,
        trim:true,
    },
    video:{
        type:String,
        trim:true,
    },
    videourl:{
        type:String, 
        trim:true,  
    },
    cloudinary_id:{
        type:String,
        trim:true,
    },
    thumb:[{
        thumbnail:{type:String},
        thumburl:{type:String},
        cloudinary_id:{type:String}
    }],
    uploadedat:{
        type:Date,
        default:Date.now
    }
},)

module.exports = mongoose.model('movie',movieSchema)