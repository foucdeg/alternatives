let app = require('express')();
let MongoClient = require('mongodb').MongoClient;
let dbConfig = require('./config/db');

MongoClient.connect(dbConfig.uri, function(err, db) {
  console.log('Connected to db');
});

app.get('/', (req, res) => {
  res.send('Hello World2');
});
app.listen(5678, () => {
  console.log('API listening on port 5678');
});
