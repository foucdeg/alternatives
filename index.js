let app = require('express')();

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.listen(5678, () => {
  console.log('API listening on port 5678');
});
