import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'db.json');

class CreditModel {
  static async getUserCredits(userId) {
    try {
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      // Initialize messageUsage if it doesn't exist
      if (!db.messageUsage) {
        db.messageUsage = {};
      }

      // Initialize user's usage if it doesn't exist
      if (!db.messageUsage[userId]) {
        db.messageUsage[userId] = {
          count: 0,
          lastResetDate: new Date().toISOString(),
          plan: 'free'
        };
        // Save the initialized data
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
      }

      return {
        usage: db.messageUsage[userId],
        subscription: db.subscriptions?.find(s => s.userId === userId && s.status === 'active'),
        plan: db.plans?.find(p => p.id === (db.messageUsage[userId].plan || 'free'))
      };
    } catch (error) {
      console.error('Error in getUserCredits:', error);
      throw error;
    }
  }

  static async updateMessageCount(userId) {
    try {
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      if (!db.messageUsage[userId]) {
        db.messageUsage[userId] = {
          count: 0,
          lastResetDate: new Date().toISOString(),
          plan: 'free'
        };
      }

      db.messageUsage[userId].count += 1;
      await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

      return db.messageUsage[userId];
    } catch (error) {
      console.error('Error in updateMessageCount:', error);
      throw error;
    }
  }

  static async resetUsageCount(userId) {
    try {
      const data = await fs.readFile(dbPath, 'utf8');
      const db = JSON.parse(data);

      if (db.messageUsage[userId]) {
        db.messageUsage[userId].count = 0;
        db.messageUsage[userId].lastResetDate = new Date().toISOString();
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
      }

      return db.messageUsage[userId];
    } catch (error) {
      console.error('Error in resetUsageCount:', error);
      throw error;
    }
  }
}

export default CreditModel;
