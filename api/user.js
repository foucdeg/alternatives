let userApp = require('express').Router();

userApp.post('/', (req, res) => {
  res.send({ method: 'post' });
});
userApp.get('/:id/', (req, res) => {
  res.send({ id: req.params.id });
});
userApp.put('/:id/', (req, res) => {
  res.send({ id: req.params.id, method: 'put' });
});

module.exports = userApp;
