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
  let projectId = req.query.pid;
  if (!projectId) {
    // ProjectID not provided, so we must create a new one
    repository.createId();
    repository.validateId("new", repository.redirectToSession(res));
  } else {
    // ProjectID provided, so we stream its current contents after we validate it
    repository.parseId(projectId);
    res.render("index");
  }
});

// SOCKET OPERATIONS
io.on("connection", function(socket) {
  console.log("a user connected");
  // check for localStorage identifier. If not existing, create it.

  // check if file repository exists
  // const fileExists = newID => {
  //   const fileName = `${newID}.json`;
  //   const path = `./sessions/${fileName}`;
  //   const res = fs.access(path, fs.F_OK, err => {
  //     if (err) console.log(err);
  //     return false;
  //   });
  //   return res || true;
  // };

  // const readFileContents = (newID, cbk) => {
  //   const fileName = `${newID}.json`;
  //   const path = `./sessions/${fileName}`;
  //   fs.readFile(path, "utf8", (err, content) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     cbk(content);
  //   });
  // };

  // const createNewFileRepository = (newID, cbk) => {
  //   const fileName = `${newID}.json`;
  //   const path = `./sessions/${fileName}`;
  //   fs.writeFile(
  //     path,
  //     JSON.stringify({
  //       editor1: {
  //         content: ""
  //       },
  //       editor2: {
  //         content: ""
  //       }
  //     }),
  //     cbk
  //   );
  // };

  // // create new file repository
  // if (!fileExists(userId)) {
  //   createNewFileRepository(userId, err => {
  //     return err ? false : true;
  //   });
  // }

  // socket.on("registerNewUser", function() {
  // });
  socket.on("save", (store)=>{
    console.log(store);
  })
  socket.on("streamFileContent", function() {});
  socket.on("submitChange", function(change) {});
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
