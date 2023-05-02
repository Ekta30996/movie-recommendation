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
}

exports.deleteThumb = async(req,res) =>{
  try
  {
    const id = req.params.id
    const thumbId =  req.body
    const movie = await movieModel.findById({'_id':id})
    const thumb = movie.thumb
    thumb.find(thumbItem =>
      cloudinary_id = thumbItem.cloudinary_id)

    cloudinary.uploader.destroy(
      cloudinary_id,
      {resource_type:'image'},
    (err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(result);
      }
    })
    const deleteThumb = await movieModel.findOneAndUpdate(
      { _id: id },
      { $pull:{'thumb':{'_id':thumbId }}},
      { new: true }
    );
    res.status(200).send(deleteThumb)
    console.log(deleteThumb);
  }catch(err){
    res.status(500).send(err)
    console.log(err);
  }
}