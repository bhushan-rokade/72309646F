const express = require('express');
const app = express();
const axios = require('axios');
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

app.get('/stocks/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const { minutes, aggregation } = req.query;
    let tickerData;
    const token = await getBearerToken();
    const response = await axios
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
    console.error('Error fetching stock data:', error);
    return res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
