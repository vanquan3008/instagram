const mongoose = require('mongoose');
require("dotenv").config();



async function connect() {
  const MONGO_DB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  try {
    await mongoose.connect(MONGO_DB);
    console.log("Connection database successfully established");
  } catch (error) {
    console.log("Error connection");
  }
}
module.exports = {
  connect
};