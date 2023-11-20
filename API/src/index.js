const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const multer = require('multer')


const app = express();


const dbase = require("./config/database");
const router = require('./router/index.js');
const corsOptions = {
  origin: 'http://localhost:5000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));




// app.use('/apiPost', express.static(path.join(__dirname, 'src/public/images_videos')));
// Đường dẫn tới thư mục chứa ảnh trên máy chủ
const imageDirectory = path.join(__dirname, 'public/images_videos');

// Phục vụ các tệp ảnh từ đường dẫn cụ thể
app.get('/apiPost/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(imageDirectory, imageName));
});

// Cấu hình tải file từ máy tính 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "src/public/images_videos")
  },
  filename: (req, file, cb) => {
      cb(null, req.body.name)
  }
})
const upload = multer({storage})

app.post("/upload", upload.array('file'), (req, res) => {
  try {
      return res.status(200).json("File uploaded successfully!")
  }
  catch (err) {
      console.log(err)
  }
})



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
