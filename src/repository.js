// repository file related actions
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
      this.id = newID;
      console.log(`[GENERATED PID]: ${this.id}`);
    },
    redirectToSession: (res) =>{
      res.redirect(`/?pid=${this.id}`);
    },
    validateId: () => {
      const fileName = `${this.id}.json`;
      const path = `../sessions/${fileName}`;
      let res = true;
      fs.access(path, fs.F_OK, err => {
        if (err) {
          res = false;
          console.log(err);
        }
      });
      return res;
    },
    parseId: id => {
      this.id = id;
      console.log(`[PARSED PID]: ${this.id}`);
    },
    createFile: {},
    readFile: {},
    updateFile: {},
    deleteFile: {}
}
module.exports = repository;