const User = require('../models/user');

const getUsersInfo = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('No users found');
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.status(200).send({ users }))
    .catch((err) => res.status(500).send({ message: `${err.message}` }));
};

const getUsersId = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(400).send({ message: 'User ID not found' });
    })
    .catch((err) => {
      res.status(500).send({ message: `${err.message}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw res.status(400).send({
          message: `${err.message} `,
        });
      }
      res.status(500).send({ message: `${err.message}` });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw res.status(400).send({
          message: `${err.message} `,
        });
      }
      res.status(500).send({ message: `${err.message}` });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw res.status(400).send({
          message: `${err.message} `,
        });
      }
      res.status(500).send({ message: `${err.message}` });
    });
};

module.exports = {
  getUsersInfo,
  getUsersId,
  createUser,
  updateUser,
  updateUserAvatar,
};
