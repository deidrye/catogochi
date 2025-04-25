const cors = require('cors');
require('dotenv').config();

const corsOptions = {
  origin: (origin, callback) => {
    // Разрешаем все запросы в разработке
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // Белый список для production
    const allowedOrigins = [
      'http://localhost:19006',
      `http://${process.env.SERVER_IP}:19006`,
      `exp://${process.env.SERVER_IP}:19000`,
      /\.exp\.direct$/,
      /\.exp\.expo\.io$/,
      'http://localhost:3000',
      `http://${process.env.SERVER_IP}:3000`,
      `http://localhost:8080`, // Для веб-версии
    ];

    if (
      !origin ||
      allowedOrigins.some((allowed) => {
        if (typeof allowed === 'string') return origin === allowed;
        return allowed.test(origin);
      })
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
01',
      'http://localhost:19002',
      'https://localhost:19002'
    ];

    if (
      !origin ||
      allowedOrigins.some((allowed) => {
        if (typeof allowed === 'string') return origin === allowed;
        return allowed.test(origin);
      })
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

module.exports = cors(corsOptions);
