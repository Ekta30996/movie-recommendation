require("../db-connection/connection");
const mongoose = require("mongoose");
const genreSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      trim: true,
      require,
      match: [
        new RegExp(/^[A-Za-z\s]+[a-z]{4,20}$/),
        "genre should conatains characters only ",
      ],
    },
    genreimg: {
      type: String,
      trim: true,
    },
    genreurl: {
      type: String,
      trim: true,
    },
    cloudinary_id: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("genre", genreSchema);
