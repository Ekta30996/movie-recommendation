//when user signup
export const SIGNUP_ENDPOINT = 'http://localhost:3000/user/signup';
export const SIGNIN_ENDPOINT = 'http://localhost:3000/user/signin';
export const ADD_GENRE_ENDPOINT = 'http://localhost:3000/user/addgenre';
export const READ_GENRELIST_ENDPOINT = 'http://localhost:3000/user';

//when user add movie in watchlist or favorite list
export const ADD_WATCHLIST = 'http://localhost:3000/user/watchlist';
export const ADD_FAVORITELIST = 'http://localhost:3000/user/favoritelist';

//read all movies and genres at USER-SIDE as well as ADMIN-SIDE
export const READ_ALL_MOVIES_ENDPOINT = 'http://localhost:5000/movie/read';
export const READ_ALL_GENRE_ENDPOINT = 'http://localhost:5000/genre/read';

//read movie by genre
export const READ_MOVIE_BY_GENRE_ENDPOINT =
  'http://localhost:3000/user/read/genre';

//read watchlist as well as watchlist
export const READ_WATCHLIST_ENDPOINT =
  'http://localhost:3000/user/read/watchlist';
export const READ_FAVORITELIST_ENDPOINT =
  'http://localhost:3000/user/read/favoritelist';

//read movies and genre by id
export const READ_MOVIE_BY_ID_ENDPONT = 'http://localhost:5000/movie/';
export const READ_GENRE_BY_ID_ENDPONT = 'http://localhost:5000/genre/';

//upload movies and genres at ADMIN-SIDE
export const UPLOAD_GENRE_ENDPOINT = 'http://localhost:5000/genre/upload';
export const UPLOAD_MOVIE_ENDPOINT = 'http://localhost:5000/movie/upload';
export const UPLOAD_THUMB_ENDPOINT = 'http://localhost:5000/thumb/upload/';

//delete movie by id at ADMIN-SIDE
export const DELETE_GENRE_ENDPOINT = 'http://localhost:5000/genre/';
export const DELETE_MOVIE_ENDPOINT = 'http://localhost:5000/movie/';
export const DELETE_THUMB_ENDPOINT = 'http://localhost:5000/thumb/';

//edit movie and gener by id at ADMIN-SIDE
export const EDIT_MOVIE_ENDPOINT = 'http://localhost:5000/movie/';
export const EDIT_GENRE_ENDPOINT = 'http://localhost:5000/genre/';

//search functionality for movie
export const SERACH_MOVIE_ENDPOINT = 'http://localhost:5000/movie/search/';
