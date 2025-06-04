const express = require('express');
const app = express();

const { getStockData } = require('./controllers/stockController');
const { getStockCorrelation } = require('./controllers/correlationController');

//Server Listening to 3000
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

//for aggregation of stock data
app.get('/stocks/:ticker', getStockData);

//for two stock correlation
app.get('/stockcorrelation', getStockCorrelation);
