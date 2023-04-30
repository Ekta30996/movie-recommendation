const genreModel = require('../models/genre.model');
const cloudinary = require("../lib/cloudinary");

//upload genres
exports.uploadGenre = (req, res) => {
  const { genre } = req.body;
  cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: 'image',
      folder: "genre",
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      try {
        const newGenre = new genreModel({
          genre: genre,
          genreimg: req.file.originalname,
          genreurl: result.url,
          cloudinary_id: result.public_id,
        });
        newGenre.save();
        res.status(200).json({
          status: "SUCCESS",
          newGenre,
        });
        console.log('new genre'+ newGenre);
      } catch (err) {
        res.status(500).send(err);
      }
      console.log('Error occurs when upload genre');
    }
  );
};

// read all genres
exports.readAllGenre = async (req, res) => {
  try {
    const read = await genreModel.find();
    res.status(200).send(read);
    console.log("All genre", read);
  } catch (err) {
    res.status(500).send(err);
    console.log("Error occurs when read all genre ", err);
  }
};

//read genre by id
exports.readGenreById = async (req, res) => {
  try {
    const id = req.params.id;
    const read = await genreModel.find({ _id: id });
    res.status(200).send(read[0]);
    console.log(read);
  } catch (err) {
    res.status(500).send(err);
    console.log("Error occurs when read genre by id", err);
  }
};

// delete genre by id
exports.deleteGenreById = async (req, res) => {
  try {
    const genre = await genreModel.findById(req.params.id);
    cloudinary.uploader.destroy(
      genre.cloudinary_id,
      { resource_type: 'image' },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    const deleted = await genreModel.deleteOne(genre);

    res.status(200).json({
      message: "Genre deleted successfully!!",
      deleted,
    });
    console.log("Genre deleted successfully!!");
  } catch (err) {
    res.status(500).json({
      message: "Error occur when delete genre",
      err,
    });
    console.log("Error occur when delete genre " + err);
  }
};

//edit genre
exports.updatedGenreById = async (req, res) => {
  try {
    const id = req.params.id;
    const genreRecord = await genreModel.findById({ _id: id });
    cloudinary.uploader.destroy(
      genreRecord.cloudinary_id,
      { resource_type: "image" },
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
        resource_type: "image",
        folder: "genre",
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        const updatedGenre = {
          genre: req.body.genre,
          genreimg: req.file.originalname,
          genreurl: result.url,
          cloudinary_id: result.public_id,
        };
        const updated = await genreModel.findByIdAndUpdate(
          { _id: id },
          updatedGenre,
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
      message: "Error occur when upadate genre",
      err,
    });
    console.log("Error occur when update genre " + err);
  }
};
