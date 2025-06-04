import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Stocks() {
  const [stocks, setStocks] = useState({});
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getStocks');
        console.log(response.data);
        setStocks(response.data.stocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchStocks();
  }, []);

  return (
    <div className='stocks-screen'>
      <h1>Stocks</h1>
      <div className='input-stock'></div>
    </div>
  );
}
