const route = require('express').Router()
const { uploadMovie, readAll, readById, deleteById } = require('../controllers/movie.controller')
const storage = require('../lib/multer')
const auth = require('../middleware/auth')

//upload movie
route.post('/upload',auth,storage.single('file'),uploadMovie)

//list all movies
route.get('/read',readAll)

//list movie by id
route.get('/:id',readById)

//delete movies
route.delete('/:id',auth,deleteById)


module.exports = route