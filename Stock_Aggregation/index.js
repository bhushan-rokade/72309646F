const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const { getStockData } = require('./controllers/stockController');
const { getStockCorrelation } = require('./controllers/correlationController');
const { getAllStocks } = require('./controllers/getStockController');

//Server Listening to 3001
app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});

//for aggregation of stock data
app.get('/stocks/:ticker', getStockData);

//for two stock correlation
app.get('/stockcorrelation', getStockCorrelation);

//for getting all stocks data
app.get('/getStocks', getAllStocks);
