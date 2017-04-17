const pjson = require('./package');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');
const mongoose = require('mongoose');
const Alternative = require('./models').Alternative;
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.uri);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', () => {
  console.log('Connected to the database');

  let app = require('express')();
  app.use(bodyParser.json());
  app.use(require('express-validator')());

  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');
    next();
  });

  app.get('/', (req, res) => {
    res.send((({ name, version, description, author }) => ({ name, version, description, author }))(pjson));
  });

  app.use('/', require('./api/user'));
  app.use('/', require('./api/admin'));

  app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
    next();
  });

  app.listen(5678, () => {
    console.log('API listening on port 5678');
  });
});
