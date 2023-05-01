const { uploadThumb, deleteThumb } = require("../controllers/thumb.controller");
const route = require("express").Router();
const storage = require("../lib/multer");
const auth = require("../middleware/auth");

//upload thumbnails
route.post("/upload/:id", auth, storage.single("thumb"), uploadThumb);

//delete thumbnails
// route.patch("/delete/:id", auth, deleteThumb);


module.exports = route;
