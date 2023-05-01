const movieModel = require("../models/movie.model");
const cloudinary = require("../lib/cloudinary");

exports.uploadThumb = async (req, res) => {
  const movie = req.params.id;

  const result = await movieModel.findById({ _id: movie });

  if (result.thumb.length > 0) {
    return res.status(409).send("Thumbnail is exists");
  } else {
    cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "image",
        folder: "thumb",
        transformation: [{ width: 1350, height: 650 }, { quality: 70 }],
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        try {
          const newThumb = {
            thumbnail: req.file.originalname,
            thumburl: result.url,
            cloudinary_id: result.public_id,
          };
          const find = await movieModel.findByIdAndUpdate(
            { _id: movie },
            { $push: { thumb: newThumb } },
            { new: true }
          );
          return res.status(200).send(find);
        } catch (err) {
          res.status(500).json({
            message: "Error occurs when upload thumb",
            err: err,
          });
          console.log("Error occurs when upload thumb " + err);
        }
      }
    );
  }

  //delete movie
  exports.deleteThumb = async (req, res) => 
  {
    // const id = req.params.id
    // const movie = await movieModel.findById({'_id':id})
    // try {

    // }
    // catch(err){

    // }

  }
}