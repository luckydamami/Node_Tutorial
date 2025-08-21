const mongoose = require("mongoose");

//const mongoURL = process.env.MONGODB_LOCAL_URL;
//const mongoURL = process.env.MONGODB_URL;
const mongoURL =
  "mongodb+srv://Aniket:Data123Ani@cluster0.4mdovk4.mongodb.net/";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB database is connected!");
});

db.on("disconnected", () => {
  console.log("Mongo DB database is disconnected!");
});

db.on("error", (error) => {
  console.log("Oops! error was occured on mongodb server!", error);
});

module.exports = db;
