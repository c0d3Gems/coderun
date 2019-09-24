// repository file related actions
'use strict';
const fs = require("fs");
const repository = {
  id: null,
  createId: () => {
    let alphabet = "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOGthequickbrownfoxjumpsoverthelazydog0123456789".split(
      ""
    );
    let newID = "";
    for (let i = 0; i < 10; ++i) {
      newID +=
        alphabet[parseInt(Math.random(0, alphabet.length) * alphabet.length)];
    }
    repository.id = newID;
    console.log(`[GENERATED PID]: ${JSON.stringify(repository.id)}`);
  },
  redirectToSession: res => {
    res.redirect(`/?pid=${repository.id}`);
  },
  validateId: (state, cbk) => {
    const fileName = `${repository.id}.json`;
    const path = `./sessions/${fileName}`;
    let exists = false;
    fs.access(path, fs.F_OK, (err, cbk) => {
      if (err) {
        if (state !== "new") {
            exists = true;
          // repository.validateId("new");
        } else {
          console.log(`[VALIDATED NEW PID]: ${JSON.stringify(repository.id)}`);
          repository.createFile(path, cbk);
        }
      }
    });
  },
  parseId: id => {
    repository.id = id;
    console.log(`[PARSED PID]: ${repository.id}`);
  },
  createFile: (path, cbk)=>{
    fs.writeFile(
        path,
        JSON.stringify({
            editor1: {
              content: `<html>
                <head>
                    <title>Some title</title>
                </head>
            </html>`
            },
            editor2: {
              content: `// Your JavaScript code here...
                function func(){ return 100; }`
            }
          })
          ,(err)=>{if(err) throw err; cbk && cbk();}
      );
  },
  readFile: {},
  updateFile: {},
  deleteFile: {}
};
module.exports = repository;
