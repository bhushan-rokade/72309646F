const axios = require('axios');
const calculateCorrelation = require('../utils');

const getStockCorrelation = async (req, res) => {
  try {
    const { minutes, ticker1, ticker2 } = req.query;

    const url1 = `http://localhost:3001/stocks/${ticker1}?minutes=${minutes}`;
    const url2 = `http://localhost:3001/stocks/${ticker2}?minutes=${minutes}`;

    const [response1, response2] = await Promise.all([
      axios.get(url1),
      axios.get(url2),
    ]);

    const data1 = response1.data;
    const data2 = response2.data;

    const prices1 = data1.priceHistory.map((p) => p.price);
    const prices2 = data2.priceHistory.map((p) => p.price);

    const minLength = Math.min(prices1.length, prices2.length);
    const trimmed1 = prices1.slice(0, minLength);
    const trimmed2 = prices2.slice(0, minLength);

    const correlation = calculateCorrelation(trimmed1, trimmed2);

    res.json({ correlation, stocks: { [ticker1]: data1, [ticker2]: data2 } });
  } catch (error) {
    console.error('Error fetching stock correlation:', error);
    res.status(500).json({ error: 'Failed to compute correlation' });
  }
};

module.exports = { getStockCorrelation };
