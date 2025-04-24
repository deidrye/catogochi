const cors = require('cors');

const corsOptions = {
  origin(origin, callback) {
    // В режиме разработки разрешаем все origin'ы
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    // В продакшене разрешаем только определенные origin'ы
    const allowedOrigins = [
      'http://localhost:8081',
      'http://localhost:3000',
      'exp://localhost:8081',
      'exp://192.168.1.1:8081',
      'http://10.0.2.2:8081',
      'http://10.0.2.2:3000',
      'http://192.168.0.101:3000', // Добавь IP своего компа
      'http://192.168.0.101:8081',
      'exp://192.168.0.101:8081',
    ];

    // Разрешаем запросы без origin (например, из мобильного Expo Go)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
