import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'db.json');

async function verifyPayment(req, res) {
  try {
    const { transactionId } = req.body;
    const userId = req.user.id;

    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }

    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);

    if (!db.transactions) db.transactions = [];
    if (!db.subscriptions) db.subscriptions = [];

    // Find the pending transaction
    const transaction = db.transactions.find(t => t.id === transactionId && t.userId === userId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Mark transaction as completed
    transaction.status = 'completed';
    transaction.completedAt = new Date().toISOString();

    // Create or update subscription
    const existingSubIndex = db.subscriptions.findIndex(s => s.userId === userId);
    const plan = db.plans.find(p => p.id === transaction.planId);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (plan.period === 'monthly' ? 30 : 365));

    const subscription = {
      id: existingSubIndex >= 0 ? db.subscriptions[existingSubIndex].id : `sub_${Date.now()}`,
      userId,
      planId: transaction.planId,
      status: 'active',
      createdAt: new Date().toISOString(),
      currentPeriodEnd: endDate.toISOString(),
    };

    if (existingSubIndex >= 0) {
      db.subscriptions[existingSubIndex] = subscription;
    } else {
      db.subscriptions.push(subscription);
    }

    // Reset message usage
    if (!db.messageUsage) db.messageUsage = {};
    if (!db.messageUsage[userId]) {
      db.messageUsage[userId] = {
        count: 0,
        lastResetDate: new Date().toISOString(),
        plan: plan.id
      };
    } else {
      db.messageUsage[userId].plan = plan.id;
    }

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    res.json({ 
      success: true, 
      transaction,
      subscription
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
}

export { verifyPayment };
