require("dotenv").config({
  path: `.env`,
})
const mongoose = require('mongoose');
const todo=require('./routes/todo');
const express = require('express');
const app = express();
//mongo "mongodb+srv://practice.nlamm.mongodb.net/myFirstDatabase" --username admin
mongoose.connect(process.env.database)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...',err));

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api/todo',todo)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));