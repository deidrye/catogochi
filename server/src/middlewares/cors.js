const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    // В режиме разработки разрешаем все origin'ы
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // В продакшене разрешаем только определенные origin'ы
      const allowedOrigins = [
        'http://localhost:8081',
        'http://localhost:3000',
        'exp://localhost:8081',
        'exp://192.168.1.1:8081',
        'http://10.0.2.2:8081',
        'http://10.0.2.2:3000',
      ];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
