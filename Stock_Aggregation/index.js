const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//Server Listening to port 3000
app.get('/stocks/:ticker', (req, res) => {
  console.log(req.params.ticker);
  console.log(req.query);
  res.send('received');
});
