const { UserLog, User, Event, Toy } = require('../../db/models');

class UserLogService {
  static async getAllLogs() {
    const logs = await UserLog.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Event, attributes: ['id', 'title'] },
        { model: Toy, attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    return logs;
  }

  static async getLogById(id) {
    const log = await UserLog.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Event, attributes: ['id', 'title'] },
        { model: Toy, attributes: ['id', 'name'] },
      ],
    });
    return log;
  }

  static async createLog(logData) {
    const newLog = await UserLog.create(logData);
    return newLog;
  }

  static async updateLog(id, newValues) {
    const log = await UserLog.findByPk(id);
    if (!log) throw new Error('Log not found');
    const updated = await log.update(newValues);
    return updated;
  }

  static async deleteLog(id) {
    const log = await UserLog.findByPk(id);
    if (!log) throw new Error('Log not found');
    await log.destroy();
  }

  static async getUserLogs(userId) {
    const logs = await UserLog.findAll({
      where: { userId },
      include: [
        { model: Event, attributes: ['id', 'title'] },
        { model: Toy, attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    return logs;
  }

  static async getUserLogsByType({ userId, type }) {
    const logs = await UserLog.findAll({
      where: { userId, type },
      include: [
        { model: Event, attributes: ['id', 'title'] },
        { model: Toy, attributes: ['id', 'name'] },
      ],
    });
    return logs;
  }
}

module.exports = UserLogService;
