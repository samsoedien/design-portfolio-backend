const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const URI = require('./config/keys').MONGODB_URI;

const port = process.env.PORT || 4000;
const server = http.createServer(app);

mongoose
  .connect(URI, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    throw new Error(err);
  });
mongoose.Promise = global.Promise;
