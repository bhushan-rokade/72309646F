import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Stocks() {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [stockData, setStockData] = useState(null);

  //fetching all stock name and ticker
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getStocks');
        setStocks(response.data.stocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchStocks();
  }, []);

  //handling for stock selection and fetching appropriate data
  const stockChangeHandler = async () => {
    if (!selectedStock) {
      alert('Please select a stock to view');
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3001/stocks/${selectedStock}?minutes=${minutes}`
      );
      setStockData(response.data);
      console.log('Stock Data:', response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div className='stocks-screen'>
      <h1>Stocks</h1>
      <div className='input-stock'>
        <label>Selct stock for viewing : </label> &nbsp;
        <select
          onChange={(e) => setSelectedStock(e.target.value)}
          value={selectedStock}>
          <option value=''>Select Stock</option>
          {Object.entries(stocks).map(([name, ticker]) => (
            <option key={ticker} value={ticker}>
              {name}
            </option>
          ))}
        </select>
        <br />
        <label>Minutes</label>
        <input
          type='number'
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          required
          min='0'
        />
      </div>
      <div>
        <button className='button-stock' onClick={stockChangeHandler}>
          Get View
        </button>
      </div>
    </div>
  );
}
