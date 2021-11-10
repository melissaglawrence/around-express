const User = require('../models/user');

const getUsersInfo = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('No users found');
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      if (err.message === 'No users found') {
        res.status(404).send({ message: 'No users found' });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

const getUsersId = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('No user found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'No user found') {
        res.status(404).send({ message: 'No user found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'No user with that id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      const ERROR__CODE = 400;
      if (err.name === 'ValidationError') {
        throw res.status(ERROR__CODE).send({
          message: `${err.message} `,
        });
      }
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No user found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      const ERROR__CODE = 400;
      if (err.name === 'ValidationError') {
        throw res.status(ERROR__CODE).send({
          message: `${err.message} `,
        });
      } else if (err.message === 'No user found') {
        res.status(404).send({ message: 'No user found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'No user with that id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error('No user found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      const ERROR__CODE = 400;
      if (err.name === 'ValidationError') {
        throw res.status(ERROR__CODE).send({
          message: `${err.message} `,
        });
      } else if (err.message === 'No user found') {
        res.status(404).send({ message: 'No user found' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'No user with that id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getUsersInfo,
  getUsersId,
  createUser,
  updateUser,
  updateUserAvatar,
};
