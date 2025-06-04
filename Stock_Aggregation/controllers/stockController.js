const axios = require('axios');
const BASE_URL = 'http://20.244.56.144/evaluation-service/';

async function getBearerToken() {
  const response = await axios.post(`${BASE_URL}auth`, {
    email: 'rokadebhushan2005@gmail.com',
    name: 'bhushan bhaskar rokade',
    rollNo: '72309646f',
    accessCode: 'KRjUUU',
    clientID: '4a83fe06-28e9-42b7-8914-c4a550d068ab',
    clientSecret: 'wypzNTWdTNNnWxRg',
  });
  return response.data.access_token;
}

const getStockData = async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const { minutes } = req.query;

    const token = await getBearerToken();
    const response = await axios.get(
      `${BASE_URL}stocks/${ticker}?minutes=${minutes}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const tickerData = response.data;
    const averagePrice =
      tickerData.reduce((acc, stock) => acc + stock.price, 0) /
      tickerData.length;

    res.json({
      averageStockPrice: averagePrice,
      priceHistory: tickerData,
    });
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};

module.exports = { getStockData };
