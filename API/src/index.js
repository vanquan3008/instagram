const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const { config } = require('dotenv');


const app = express();
//Dot env
config();

const dbase = require("./config/database");
const router = require('./router/index.js');
const corsOptions = {
  origin: process.env.URL_FRONTEND, 
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
const PORT = parseInt(process.env.NODE_BACKEND_URL) || 3000;

//connect to database
dbase.connect();

//HTTP logger
app.use(morgan("combined"));
//Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
//Router
router(app);

// 127.0.0.1 - localhost:3000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
