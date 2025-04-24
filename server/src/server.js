require('dotenv').config();
const app = require('./app');

const PORT = process.env.SERVER_PORT || 3000;
const HOST = '0.0.0.0'; // Слушаем на всех интерфейсах

app.listen(PORT, HOST, () => {
  console.log(`Server has started on ${HOST}:${PORT}`);
});
