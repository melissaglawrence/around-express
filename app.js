const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/arounddb');

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6188272b7a77c6a0f505e275',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
