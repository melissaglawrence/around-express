const router = require("express").Router();
const path = require("path");
const getDataFile = require("../utils/files");

const dataPath = path.join(__dirname, "..", "data", "users.json");

const getUsersInfo = (req, res, next) => {
  return getDataFile(dataPath)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send({ message: "Users not found" }));
};

const getUsersId = (req, res, next) => {
  return getDataFile(dataPath)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(400).send({ message: "User ID not found" });
    })
    .catch(() => {
      return res.status(400).send({ message: "User ID not found" });
    });
};

router.get("/", getUsersInfo);
router.get("/:id", getUsersId);

module.exports = router;
