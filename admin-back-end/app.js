const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
const movie = require('./routers/movie.router')
const thumb = require('./routers/thumb.router')
const genre = require('./routers/genre.router')
//parse incoming request into json
app.use(express.json())

//use middleware
app.use((req,res,next)=>{
    next()
})

//use cors as middleware
app.use(cors({
    credentials:true,
    origin:['http://localhost:5000','http://localhost:3000','http://localhost:8080','http://localhost:4200']
}))

//set view
app.set('view engine','ejs')

//set view from folder
app.set('views','./views')
 
// for movies
app.use('/movie',movie)

//for thumbnails
app.use('/thumb',thumb)

//for genres
app.use('/genre',genre)

//listen to port
app.listen(PORT,()=>{
    console.log(`Server is live on port ${PORT}...`);
})