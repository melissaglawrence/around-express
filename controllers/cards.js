const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('No cards found');
      error.statusCode = 404;
      throw error;
    })
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      const error = new Error('No card found');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } })
    .then((like) => {
      res.status(200).send({ likes: like });
    })
    .catch((err) => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } })
    .then((dislike) => {
      res.status(200).send({ likes: dislike });
    })
    .catch((err) => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
