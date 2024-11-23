const env = require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));
};

module.exports = connectToDatabase;
