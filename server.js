const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const app = express();

// Connect to DB
mongoose.connect(`mongodb://admin:admin123@ds157276.mlab.com:57276/wonderq`)
  .then(() => {
    console.log('Connected to DB');
  });

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Routes
app.use('/', router);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening to port ${process.env.PORT || 4000}`);
});