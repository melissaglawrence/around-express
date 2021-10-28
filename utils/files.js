const fsPromises = require('fs').promises;

const getDataFile = (pathToFile, res) => fsPromises
  .readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data))
  .catch(() => {
    res.status(500).send({ message: 'message here' });
  });

module.exports = getDataFile;
