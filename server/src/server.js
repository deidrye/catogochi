const WebSocket = require('ws');
const { randomEvent, setLastSession, getOfflineEvents } = require('./utils/randomEvent');
const { createServer } = require('http');
const app = require('./app');

const PORT = process.env.SERVER_PORT || 3000;
const server = createServer(app);
const wss = new WebSocket.Server({ server });

const offlineEvents = async (ws, userId, catId) => {
  const totalEvents = await getOfflineEvents(userId, catId);
  if (!totalEvents.title) {
    return;
  }

  ws.send(JSON.stringify({ type: 'offline', payload: totalEvents }));
};

// Хранилище подключений
const clients = new Map();

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('message recieved:', message);

      // Обрабатываем инициализационное сообщение
      if (message.type === 'init' && message.payload.catId) {
        clients.set(ws, { catId: message.payload.catId, userId: message.payload.userId });
        console.log(
          `User ${message.payload.userId} with cat ${message.payload.catId} initialized`,
        );
        offlineEvents(ws, message.payload.userId, message.payload.catId);
      }
    } catch (err) {
      console.error('Error parsing message:', err);
    }
  });

  // Интервал для отправки событий
  const interval = setInterval(async () => {
    if (clients.has(ws)) {
      const { catId } = clients.get(ws);
      const event = await randomEvent(catId); // Передаем catId в randomEvent

      ws.send(
        JSON.stringify({
          type: 'event',
          payload: event,
        }),
      );
    }
  }, 6000);

  ws.on('close', async () => {
    clearInterval(interval);
    const { userId } = clients.get(ws);
    setLastSession(userId);
    clients.delete(ws);
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
