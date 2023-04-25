const {register,login, readByGenre, readWatchlist, readFavoritelist, addGenre, addWatchlist, addfavoritelist}  = require('../controllers/user.controller')
const { emailVerification } = require('../controllers/user.mail')
const auth = require('../middleware/auth')
const route = require('express').Router()

route.post('/signup',register)

route.get('/verify', emailVerification)

route.post('/signin',login)

route.get('/read/genre',auth,readByGenre)

route.get('/read/watchlist',auth,readWatchlist)

route.get('/read/favoritelist',auth,readFavoritelist)

route.post('/addgenre',auth,addGenre)

route.post('/watchlist',auth,addWatchlist)

route.post('/favoritelist',auth,addfavoritelist)

module.exports = route 