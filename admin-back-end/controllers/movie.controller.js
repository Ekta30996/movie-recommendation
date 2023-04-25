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
           status:'SUCCESS'
        });
        console.log(newVideo);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );
};

//list movies
exports.readAll = async (req, res) => {
  try {
    const read = await movieModel.find();
    res.status(200).json(read);
    console.log("Retrieve all movies " + read);
  } catch (err) {
    res.status(500).json({
      message: "Error occurs when retrive all movies",
      err,
    });
    console.log("Error occurs when retrive all movies " + err);
  }
};

//list movie by id
exports.readById = async (req, res) => {
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
exports.deleteById = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);

    await cloudinary.uploader.destroy(
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
      message:"Movie deleted successfully!!",
      deleted
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
