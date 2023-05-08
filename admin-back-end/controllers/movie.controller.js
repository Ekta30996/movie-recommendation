const movieModel = require("../models/movie.model");
const cloudinary = require("../lib/cloudinary");

//upload movies
exports.uploadMovie = (req, res) => {
  const { title, description, genre } = req.body;
  cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: "video",
      folder: "movie",
    },
    (err, result) => {
      if (err) {
        console.log("Error occurs when upload movie on cloudinary ", err);
      } else {
        console.log("Movie uploaded successfully on cloudinary ", result);
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
        res.status(200).send(newVideo);
        // console.log("Movie uploaded successfully!! ", newVideo);
      } catch (err) {
        res.status(500).send(err);
        // console.log("Error occurs when upload movies ", newVideo);
      }
    }
  );
};

//list movies
exports.readAllMovies = async (req, res) => {
  try {
    const limit = req.query.limit;
    const read = await movieModel.find().sort({ uploadedat: -1 }).limit(limit);
    res.status(200).json(read);
    // console.log("Retrieve all movies" + read);
  } catch (err) {
    res.status(500).send(err);
    // console.log("Error occurs when retrive all movies " + err);
  }
};

//list movie by id
exports.readMovieById = async (req, res) => {
  const id = req.params.id;
  try {
    const read = await movieModel.find({ _id: id });
    res.status(200).send(read[0]);
    // console.log("Read movie by id: ", read);
  } catch (err) {
    res.status(500).send(err);
    // console.log("Error occurs when retrieve movie by id", err);
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
          console.log("Error occurs when delete movie from cloudinary ", err);
        } else {
          console.log("Movie deleted successfully from cloudinary ", result);
        }
      }
    );
    const deleted = await movie.deleteOne(movie);
    res.status(200).send(deleted);
    // console.log("Movie deleted successfully!!");
  } catch (err) {
    res.status(500).send(err);
    // console.log("Error occur when delete movie " + err);
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
          console.log(
            "Error occurs when update(delete) movie on cloudinary ",
            err
          );
        } else {
          console.log(
            "Movie updated(deleted) successfully on cloudinary ",
            result
          );
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
          console.log(
            "Error occurs when upload(delete) movie on cloudinary ",
            err
          );
        } else {
          console.log(
            "Movie upload(deleted) successfully on cloudinary ",
            result
          );
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
        res.status(200).send(updated);
        // console.log("Movie updated successfully on cloudinary");
      }
    );
  } catch (err) {
    res.status(500).send(err);
    // console.log("Error occurs when update movie " + err);
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
    // console.log("Search movies " + read);
  } catch (err) {
    res.status(500).send(err);
    // console.log("Error occurs when search ", err);
  }
};
