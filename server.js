const express = require("express");
const config = require("./config/config.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require("./models/connect-database.js")
const connection = new connectDB;
connection.connect()


app.listen(config.PORT, () => {
  config.PORT,
    console.log(`Server listening on port http://localhost:${config.PORT}`);
});
