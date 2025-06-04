const express = require('express');
const app = express();
const axios = require('axios');
const calculateCorrelation = require('./utils');

//Server Listening to port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
const BASE_URL = 'http://20.244.56.144/evaluation-service/';

//function for getting bearer token
async function getBearerToken() {
  try {
    const response = await axios.post(`${BASE_URL}auth`, {
      email: 'rokadebhushan2005@gmail.com',
      name: 'bhushan bhaskar rokade',
      rollNo: '72309646f',
      accessCode: 'KRjUUU',
      clientID: '4a83fe06-28e9-42b7-8914-c4a550d068ab',
      clientSecret: 'wypzNTWdTNNnWxRg',
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching bearer token:', error);
    throw error;
  }
}

// Stock Aggregation API
app.get('/stocks/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const { minutes, aggregation } = req.query;
    let tickerData;
    const token = await getBearerToken();
    await axios
      .get(`${BASE_URL}stocks/${ticker}?minutes=${minutes}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => (tickerData = res.data))
      .catch((err) => res.send(err));

    const averagePrice =
      tickerData.reduce((acc, stock) => acc + stock.price, 0) /
      tickerData.length;

    res.json({
      averageStockPrice: averagePrice,
      priceHistory: tickerData,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed' });
  }
});

//correlation of two stocks api
app.get('/stockcorrelation', async (req, res) => {
  try {
    const { minutes, ticker1, ticker2 } = req.query;

    const url1 = `http://localhost:3000/stocks/${ticker1}?minutes=${minutes}&aggregation=average`;
    const url2 = `http://localhost:3000/stocks/${ticker2}?minutes=${minutes}&aggregation=average`;

    const [response1, response2] = await Promise.all([
      axios.get(url1),
      axios.get(url2),
    ]);

    stocks = {
      [ticker1]: response1.data,
      [ticker2]: response2.data,
    };
    const data1 = response1.data;
    const data2 = response2.data;
    const prices1 = data1.priceHistory.map((p) => p.price);
    const prices2 = data2.priceHistory.map((p) => p.price);

    const minLength = Math.min(prices1.length, prices2.length);
    const trimmed1 = prices1.slice(0, minLength);
    const trimmed2 = prices2.slice(0, minLength);

    const correlation = calculateCorrelation(trimmed1, trimmed2);

    res.json({ correlation: correlation, stocks });
  } catch (error) {
    console.error('Error fetching stock correlation:', error);
    return res.status(500).json({ error: 'Failed to compute correlation' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
