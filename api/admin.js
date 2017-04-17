let adminApp = require('express').Router();

adminApp.post('/', (req, res) => {
  res.send({ method: 'post' });
});
adminApp.put('/:id', (req, res) => {
  res.send({ id: req.params.id, method: 'put' });
});

module.exports = adminApp;
