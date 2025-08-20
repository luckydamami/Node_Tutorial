const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/myhotel";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.on("connected", () => {
  console.log("DB server is connected!");
});

dbConnection.on("error", (err) => {
  console.log("sever error occured", err);
});

dbConnection.on("disconnected", () => {
  console.log("DB server is disconnected!");
});

module.exports = dbConnection;
