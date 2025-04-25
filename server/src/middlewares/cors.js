const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:19006',
    'http://192.168.3.172:19006',
    'exp://192.168.3.172:19000',
    /\.exp\.direct$/,
    /\.exp\.expo\.io$/,
    'http://localhost:3000',
    'http://192.168.3.172:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

module.exports = cors(corsOptions);
