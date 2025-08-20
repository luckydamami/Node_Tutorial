//This Is Setup The Mongoose DBMS

//step-1 import the mongoose library
const mongoose = require("mongoose");

//step-2 define the mongoDB url
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

//step-3 setup the MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true, //this is mandatory perameter for stablish the connection
  useUnifiedTopology: true,
});

//step-4 Access the default connection Object
const db = mongoose.connection;

//step-5 Define the event listeners for the database connection
db.on("connected", () => {
  console.log("Mongo DB database is connected!");
});

db.on("disconnected", () => {
  console.log("Mongo DB database is disconnected!");
});

db.on("error", (error) => {
  console.log("Oops! error was occured on mongodb server!", error);
});

//step-5 export the db.js to stablish the database connection before handling the http requests.
module.exports = db;
