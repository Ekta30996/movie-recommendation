const {uploadGenre, readAllGenre,deleteById, readById, updatedGenreById, readGenreById, deleteGenreById}  = require('../controllers/genre.controller')
const route = require('express').Router()
const storage = require('../lib/multer')
const auth = require('../middleware/auth')

//upload genre
route.post('/upload',auth,storage.single('image'),uploadGenre)

//read genres
route.get('/read',readAllGenre)

//read genre by id
route.get('/:id',readGenreById)

//delete genre
route.delete('/:id',auth,deleteGenreById)

route.patch('/:id',auth,storage.single('image'),updatedGenreById)


module.exports = route  