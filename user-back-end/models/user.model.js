require('../db-connection/connection')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        minlength:4,
        match:[new RegExp(/^[A-Z][A-Za-z]{4,20}$/),'Username should starts with capital letter and should not contains white space minimun length 4']
    },
    email:{
        unique:true,
        type:String, 
        trim:true,  
        match:[new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/gi),'Invalid email']
    },
    password:{
        type:String,
        trim:true,
    },
    isverified:{
        type:Boolean,
        default:false
    }, 
    isadmin:{
        type:Boolean,
        default:false
    },  
    genres:[{
        type:mongoose.Types.ObjectId,
        ref:'genre'
    }],
    watches:[{
        type:mongoose.Types.ObjectId,
        ref:'video'
    }],
    wishes:[{
        type:mongoose.Types.ObjectId,
        ref:'video'
    }]
},{timestamps:true})

module.exports = mongoose.model('user',userSchema)