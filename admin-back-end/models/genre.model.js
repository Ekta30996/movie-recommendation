require('../db-connection/connection')
const mongoose = require('mongoose')
const genreSchema = new mongoose.Schema({
    genre:{
        type:String,
        trim:true,
        require,
    },
    genreimg:{
        type:String,
        trim:true,
    },
    genreurl:{
        type:String, 
        trim:true,  
    },
    cloudinary_id:{
        type:String,
        trim:true,
    },
},
    {timestamps:true},)

module.exports = mongoose.model('genre',genreSchema)