const {uploadGenre, readAllGenre,deleteById, updatedById, readById}  = require('../controllers/genre.controller')
const route = require('express').Router()
const storage = require('../lib/multer')
const auth = require('../middleware/auth')

//upload genre
route.post('/upload',auth,storage.single('image'),uploadGenre)

//read genres
route.get('/read',readAllGenre)

//read genre by id
route.get('/:id',readById)

//delete genre
route.delete('/:id',auth,deleteById)

route.patch('/:id',auth,storage.single('image'),updatedById)


module.exports = route