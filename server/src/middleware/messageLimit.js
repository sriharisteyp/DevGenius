import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'db.json');

const FREE_DAILY_LIMIT = 15;
const PRO_DAILY_LIMIT = 100;

async function getUserDailyLimit(userId) {
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    // Check if user has an active pro subscription
    const activeSubscription = db.subscriptions?.find(
        s => s.userId === userId && s.status === 'active' && s.planId === 'pro'
    );
    
    return activeSubscription ? PRO_DAILY_LIMIT : FREE_DAILY_LIMIT;
}

async function checkMessageLimit(req, res, next) {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const data = await fs.readFile(dbPath, 'utf8');
        const db = JSON.parse(data);

        // Initialize messageUsage if not exists
        if (!db.messageUsage) {
            db.messageUsage = {};
        }
        
        // Initialize user usage if not exists
        if (!db.messageUsage[userId]) {
            db.messageUsage[userId] = {
                count: 0,
                lastReset: new Date().toISOString()
            };
        }

        // Check if we need to reset the count (new day)
        const lastReset = new Date(db.messageUsage[userId].lastReset);
        const now = new Date();
        const isNewDay = lastReset.getUTCDate() !== now.getUTCDate() ||
                        lastReset.getUTCMonth() !== now.getUTCMonth() ||
                        lastReset.getUTCFullYear() !== now.getUTCFullYear();

        if (isNewDay) {
            db.messageUsage[userId] = {
                count: 0,
                lastReset: now.toISOString()
            };
        }

        // Get user's daily limit
        const dailyLimit = await getUserDailyLimit(userId);

        // Check if user has reached their limit
        if (db.messageUsage[userId].count >= dailyLimit) {
            return res.status(429).json({ 
                error: 'Daily message limit reached',
                limit: dailyLimit,
                used: db.messageUsage[userId].count,
                resetTime: new Date(db.messageUsage[userId].lastReset).toISOString()
            });
        }

        // Increment message count
        db.messageUsage[userId].count++;
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

        // Add usage info to request for logging
        req.messageUsage = {
            limit: dailyLimit,
            used: db.messageUsage[userId].count,
            remaining: dailyLimit - db.messageUsage[userId].count
        };

        next();
    } catch (error) {
        console.error('Error checking message limit:', error);
        res.status(500).json({ error: 'Failed to check message limit' });
    }
}

export { checkMessageLimit };
