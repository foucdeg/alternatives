const dbConfig = require('./config/db');
const pjson = require('./package');
const userApp = require('./api/user');
const bodyParser = require('body-parser');
let app = require('express')();
let MongoClient = require('mongodb').MongoClient;

MongoClient.connect(dbConfig.uri, function(err, db) {
  console.log('Connected to db');
});

app.use(bodyParser.json());
app.use(require('express-validator')());

app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});


app.get('/', (req, res) => {
  res.send((({ name, version, description, author }) => ({ name, version, description, author }))(pjson));
});

app.use('/', userApp);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
  next();
});

app.listen(5678, () => {
  console.log('API listening on port 5678');
});
