const fsPromises = require("fs").promises;

const getDataFile = (pathToFile) => {
  return fsPromises
    .readFile(pathToFile, { encoding: "utf-8" })
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      return console.log(err);
    });
};

module.exports = getDataFile;
