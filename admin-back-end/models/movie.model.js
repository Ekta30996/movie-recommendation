require('../db-connection/connection')
const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        match:[new RegExp(/^[A-Za-z+\s][a-z0-9+\s]{4,20}$/),'Movie title must start with letters']
    },
    description:{
        type:String,
        trim:true,
        match:[new RegExp(/^([A-Za-z0-9+\s]||[a-z+\s()?&-_]{100,5000})$/),'movie description is invalid']
    },
    genre:{
        type:String,
        trim:true,
        match:[new RegExp(/^[A-Za-z]{4,20}$/),'genre should conatains characters only ']
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