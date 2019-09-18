const express = require("express");
const fs = require("fs");
const app = express();

// INITIALIZE EXPRESS SERVER TO LISTEN TO A CERTAIN PORT
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

// SET RENDERING METHOD
app.set("view engine", "ejs");

// MAKE STATIC FOLDER AVAILABLE
app.use(express.static(__dirname + "/static"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});
