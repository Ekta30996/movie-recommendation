const route = require("express").Router();
const {
  uploadMovie,
  readAllMovies,
  readMovieById,
  deleteMovieById,
  updatedMovieById,
  readByParameters,
} = require("../controllers/movie.controller");
const storage = require("../lib/multer");
const auth = require("../middleware/auth");

//upload movie
route.post("/upload", auth, storage.single("file"), uploadMovie);

//list all movies
route.get("/read", readAllMovies);

//list movie by id
route.get("/:id", readMovieById);

route.get("/search/:q", readByParameters);

//delete movies
route.delete("/:id", auth, deleteMovieById);

route.patch("/:id", auth, storage.single("file"), updatedMovieById);

module.exports = route;
