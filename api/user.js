let userApp = require('express').Router();
let apiValidationSchemas = require('./schemas');

userApp.get('/:id/', (req, res) => {
  res.send({ id: req.params.id });
});

userApp.post('/:id/vote', (req, res) => {
  req.checkBody(apiValidationSchemas.userPostVote);
  req.getValidationResult().then((results) => {
    if (!results.isEmpty()) {
      res.status(400).send(results.mapped());
      return;
    }
    res.status(201).send({status: 'OK'});
  });
});

module.exports = userApp;
