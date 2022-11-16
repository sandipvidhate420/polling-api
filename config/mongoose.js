const mongoose = require("mongoose");
//connecting mongoose with database
const env = require('./environment')
const url = `mongodb+srv://sandipvidhate:radhe123@cluster0.kkfbksy.mongodb.net/${env.db}?retryWrites=true&w=majority`;

mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to DB");
});
// exporting database
module.exports = db;
