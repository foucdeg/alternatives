let userApp = require('express').Router();
const Alternative = require('../models').Alternative;

userApp.get(/^\/([0-9a-f]+)$/, (req, res) => {
  console.log('in route');
  return Alternative.findOne({_id: req.params[0]}).then((alt) => {
    res.send(alt);
  });
});

userApp.post('/:id/vote', (req, res) => {
  res.status(201).send({status: 'OK'});
});

module.exports = userApp;
