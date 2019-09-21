const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// INITIALIZE EXPRESS SERVER TO LISTEN TO A CERTAIN PORT
const port = process.env.PORT || 8080;
http.listen(port, () => {
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

app.get("/p", (req, res) => {
  // res.render("index");
});

// SOCKET OPERATIONS
io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
