require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connection successful!!");
} catch (err) {
  console.log(`Connection failed due to ${err}`);
}
