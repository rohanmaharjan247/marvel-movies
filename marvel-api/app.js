const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/mcu-api');
const app = express();

app.use(cors());

app.use("/api/mcu", routes);
app.use("/", express.static("./dist/marvel-movies"));
app.use("/*", (req,res,next)=>{
  res.sendFile('/index.html', {root: './dist/marvel-movies'});
})

module.exports = app;
