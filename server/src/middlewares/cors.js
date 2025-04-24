const cors = require('cors');

const corsOptions = {
  origin: true, // В режиме разработки разрешаем все origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

module.exports = cors(corsOptions);
