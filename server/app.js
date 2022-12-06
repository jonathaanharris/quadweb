require('dotenv').config()

const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 8080
const router = require('./routers')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', router)
app.use(errorHandler)

app.listen(PORT, (req, res) => {
  console.log('listen');
})

module.exports = app