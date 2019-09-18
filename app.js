const express = require("express");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 80;

// app.use('/views', express.static('public'));

app.listen(port, ()=>{
  console.log(`Running on port: ${port}`);
});
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get("/", (req, res) => {
  res.render('index');
});
