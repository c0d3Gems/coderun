"use strict";

const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const repository = require("./src/repository");

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
  const projectId = req.query.pid;
  if (!projectId) {
    // ProjectID not provided, so we must create a new one
    repository.createId();
    repository.validateId("new", repository.redirectToSession(res));
  } else {
    // ProjectID provided, so we stream its current contents after we validate it
    repository.parseId(projectId);
    res.render("index");

    // SOCKET OPERATIONS
    io.of(`${repository.id}`).on("connection", function(socket) {

      socket.on("message", (projectId, store) => {
        // console.log(store);
        const sync = (msg) => socket.broadcast.emit('sync', msg);
        
        repository.updateFile(projectId, store, sync);
        repository.readFile(sync);
      });

      socket.on("disconnect", () => {
        console.log("a user disconnected");
      });
    });
  }
});
