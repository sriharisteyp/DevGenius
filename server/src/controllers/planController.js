import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/db.json');

export const getPlans = async (req, res) => {
  try {
    const data = await readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    res.json(db.plans);
  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({ error: 'Failed to get plans' });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    const plan = db.plans.find(p => p.id === id);
    
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    
    res.json(plan);
  } catch (error) {
    console.error('Error getting plan:', error);
    res.status(500).json({ error: 'Failed to get plan' });
  }
};

export const createSubscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const data = await readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    // Find the plan
    const plan = db.plans.find(p => p.id === planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // Create subscription
    const subscription = {
      id: Date.now().toString(),
      userId,
      planId,
      status: 'active',
      createdAt: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };

    if (!db.subscriptions) {
      db.subscriptions = [];
    }

    db.subscriptions.push(subscription);
    await writeFile(dbPath, JSON.stringify(db, null, 2));

    res.json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

export const getUserSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    if (!db.subscriptions) {
      return res.status(404).json({ error: 'No subscriptions found' });
    }

    const subscription = db.subscriptions
      .find(s => s.userId === userId && s.status === 'active');
    
    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    const plan = db.plans.find(p => p.id === subscription.planId);
    
    res.json({
      ...subscription,
      plan
    });
  } catch (error) {
    console.error('Error getting subscription:', error);
    res.status(500).json({ error: 'Failed to get subscription' });
  }
};
