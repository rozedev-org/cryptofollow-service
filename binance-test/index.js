const axios = require('axios');
const crypto = require('crypto');

const apiKey = 'XyxXQdH4at3eQ700XmwK1gUGOcMA1Ts6jlqQ6wPq61lvoXb7YCIJGtkWAIIWWmvR';
const secretKey = 'lU8Zd4uJliZEQexEhR48LxPCqOMurLCxHoHiwm54dbQYFvcFmFbSNtaFwix1sS94';
const baseUrl = 'https://api.binance.com';

async function getMyTrades(symbol) {
  const timestamp = Date.now();
  const query = `symbol=${symbol}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', secretKey).update(query).digest('hex');

  try {
    const response = await axios.get(`${baseUrl}/api/v3/myTrades?${query}&signature=${signature}`, {
      headers: {
        'X-MBX-APIKEY': apiKey
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Llama a la función pasando el símbolo deseado, por ejemplo 'BTCUSDT'.
getMyTrades('BONKUSDT');
