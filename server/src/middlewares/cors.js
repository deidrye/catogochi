const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8081', 'http://localhost:19006'], // Разрешаем только наши приложения
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

module.exports = cors(corsOptions);
