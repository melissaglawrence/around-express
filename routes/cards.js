const router = require("express").Router();
const path = require("path");
const getDataFile = require("../utils/files");

const dataPath = path.join(__dirname, "..", "data", "cards.json");

const getCards = (req, res, next) => {
  return getDataFile(dataPath)
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(404).send(err));
};

router.get("/", getCards);

module.exports = router;
