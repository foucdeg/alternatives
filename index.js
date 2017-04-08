const dbConfig = require('./config/db');
const pjson = require('./package');
const userApp = require('./api/user');
let app = require('express')();
let MongoClient = require('mongodb').MongoClient;

MongoClient.connect(dbConfig.uri, function(err, db) {
  console.log('Connected to db');
});

app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

app.get('/', (req, res) => {
  res.send((({ name, version, description, author }) => ({ name, version, description, author }))(pjson));
});

app.use('/', userApp);

app.listen(5678, () => {
  console.log('API listening on port 5678');
});
