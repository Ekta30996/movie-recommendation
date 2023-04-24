const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
const user = require('./routers/user.router')

//parse incoming request into json
app.use(express.json())

//use middleware
app.use((req,res,next)=>{
    next()
})

//use cors as middleware
app.use(cors({
    credentials:true,
    origin:['http://localhost:5000','http://localhost:8080','http://localhost:4200','http://localhost:3000',]
}))

//set view
app.set('view engine','ejs')

//set view folder
app.set('views','./views')
 
//for user
app.use('/user',user)

//listen port
app.listen(PORT,()=>{
    console.log(`Server is live on port ${PORT}...`);
})