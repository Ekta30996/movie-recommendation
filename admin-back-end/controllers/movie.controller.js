const movieModel = require("../models/movie.model");
const cloudinary = require("../lib/cloudinary");
const ObjectId = require("mongoose").Types.ObjectId;

//upload movies
exports.uploadMovie = (req, res) => {
  const { title, description, genre } = req.body;
  cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: "video",
      folder: "movie",
      transformation: [{ quality: 200 }, { async: true }],
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      try {
        const newVideo = new movieModel({
          title: title,
          description: description,
          genre: genre,
          video: req.file.originalname,
          videourl: result.url,
          cloudinary_id: result.public_id,
        });
        newVideo.save();
        res.status(200).json({
          newVideo,
          status: "SUCCESS",
        });
        console.log(newVideo);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );
};

//list movies
exports.readAllMovies = async (req, res) => {
  try {
    const limit = req.query.limit
    const read = await movieModel.find().sort({'uploadedat':-1}).limit(limit);
    res.status(200).json(read);
    console.log("Retrieve all movies" + read);
  } catch (err) {
    res.status(500).json({
      message: "Error occurs when retrive all movies",
      err,
    });
    console.log("Error occurs when retrive all movies " + err);
  }
};

//list movie by id
exports.readMovieById = async (req, res) => {
  const id = req.params.id;
  try {
    const read = await movieModel.find({ _id: id });
    res.status(200).send(read[0]);
    console.log("Read movie by id: ", read);
  } catch (err) {
    res.status(500).json({
      message: "Error occurs when retrieve movie by id",
      err,
    });
    console.log("Error occurs when retrieve movie by id", err);
  }
};

//delete by id
exports.deleteMovieById = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    cloudinary.uploader.destroy(
      movie.cloudinary_id,
      { resource_type: "video" },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    const deleted = await movie.deleteOne(movie);

    res.status(200).json({
      message: "Movie deleted successfully!!",
      deleted,
    });
    console.log("Movie deleted successfully!!");
  } catch (err) {
    res.status(500).json({
      message: "Error occur when delete movie",
      err,
    });
    console.log("Error occur when delete movie " + err);
  }
};

//edit movie by id
exports.updatedMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const movieRecord = await movieModel.findById({ _id: id });
    cloudinary.uploader.destroy(
      movieRecord.cloudinary_id,
      { resource_type: "video" },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "video",
        folder: "movie",
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        const updatedMovie = {
          title: req.body.title,
          description: req.body.description,
          genre: req.body.genre,
          video: req.file.originalname,
          videourl: result.url,
          cloudinary_id: result.public_id,
        };
        const updated = await movieModel.findByIdAndUpdate(
          { _id: id },
          updatedMovie,
          { new: true }
        );
        res.status(200).json({
          message: "updated",
          updated,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Error occur when update movie",
      err,
    });
    console.log("Error occur when update movie " + err);
  }
};

exports.readByParameters = async (req, res) => {
  try {
    const q = req.params.q;
    const read = await movieModel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
      ],
    });
    if (read.length === 0) {
      return res.status(400).send("No result found");
    }
    res.status(200).send(read);
    console.log("Search movies " + read);
  } catch (err) {
    res.status(500).json({
      message: "Error occurs when search",
      err,
    });
    console.log("Error occurs when search ", err);
  }
};
