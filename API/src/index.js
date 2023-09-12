const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')


const dbase = require("./config/database");
const router = require('./router/index.js');


const app = express();
const port = 3000;
//connect to database
dbase.connect();
//Create evniroment env
dotenv.config()

//HTTP logger
app.use(morgan("combined"));
//Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
//Router
router(app);

// 127.0.0.1 - localhost:3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
