const path = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const passport = require('passport');
const uuidv4 = require('uuid/v4');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv').config();
const csrf = require('csurf');

const contactRoutes = require('./routes/contact')

const app = express();

// const csrfProtection = csrf();

// const privateKey = fs.readFileSync('bin/server.key');
// const certificate =  fs.readFileSync('bin/server.cert');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Set EJS Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, 'logs', 'access.log'),
//   { flags: 'a' }
// );

app.use(helmet());
app.use(compression());
// app.use(morgan('combined', { stream: accessLogStream }));
// app.use(morgan('dev'));


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer Middleware
app.use(
  multer({ storage: fileStorage, fileFilter }).single('image'),
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handling CORS errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Use Routes
app.use('/api/contact', contactRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

// Morgan setup
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// const port = process.env.PORT || 3001;
const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
// https.createServer({ key: privateKey, cert: certificate }, app).listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
