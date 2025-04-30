const EventService = require('../services/EventService');
const UserService = require('../services/UserService');

function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function randomEvent(catId) {
  const data = await EventService.getAllByCatId(catId);
  const events = JSON.parse(JSON.stringify(data));
  return events[randomValue(0, events.length - 1)];
}

async function setLastSession(userId) {
  const now = new Date();
  await UserService.updateUser(userId, { lastSession: now });
}

async function getOfflineEvents(userId, catId) {
  const user = await UserService.getById(userId);
  const lastTime = new Date(user.lastSession);
  const now = new Date();
  const rangeOfTimeOut =
    (now - lastTime) / (1000 * 60 * 40) > 10 ? 10 : (now - lastTime) / (1000 * 60 * 40);

  const totalEvents = { angry: 0, hp: 0, energy: 0, affection: 0, boldness: 0 };
  if (rangeOfTimeOut >= 1) {
    for (let i = 1; i < rangeOfTimeOut; i++) {
      // eslint-disable-next-line no-await-in-loop
      const event = await randomEvent(catId);
      for (const key in event.effect) {
        totalEvents[key] += event.effect[key];
      }
    }
  }
  return {
    title: 'Ваш кот поймал белку',
    description: 'Пока Вас не было, кот не тратил время зря и развлекался как мог!',
    effect: totalEvents,
    catId,
    toyId: null,
  };
}

module.exports = { randomValue, randomEvent, setLastSession, getOfflineEvents };
