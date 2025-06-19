import express from 'express';
import { promises as fs } from 'fs';
import { authenticateToken } from '../middleware/auth.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'db.json');

const router = express.Router();

// Payment verification endpoint
router.post('/verify', authenticateToken, async (req, res) => {
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
});

// Function to save transaction and create subscription
async function completePayment(userId, transactionId, planId) {
  const data = await fs.readFile(dbPath, 'utf8');
  const db = JSON.parse(data);

  // Initialize arrays if they don't exist
  if (!db.transactions) db.transactions = [];
  if (!db.subscriptions) db.subscriptions = [];

  // Find the plan
  const plan = db.plans.find(p => p.id === planId);
  if (!plan) throw new Error('Plan not found');

  // Create transaction
  const transaction = {
    id: transactionId,
    userId,
    planId,
    amount: plan.price,
    status: 'completed',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  };
  
  // Create subscription
  const subscription = {
    id: Date.now().toString(),
    userId,
    planId,
    transactionId,
    status: 'active',
    createdAt: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    plan
  };

  // Deactivate existing subscriptions for this user
  db.subscriptions = db.subscriptions.map(s => 
    s.userId === userId ? { ...s, status: 'inactive' } : s
  );

  // Add new records
  db.transactions.push(transaction);
  db.subscriptions.push(subscription);

  // Save to database
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

  return { transaction, subscription };
}

// Function to save transaction and create subscription
const completePayment = async (userId, transactionId, planId) => {
  const data = await fs.readFile(dbPath, 'utf8');
  const db = JSON.parse(data);

  // Initialize arrays if they don't exist
  if (!db.transactions) db.transactions = [];
  if (!db.subscriptions) db.subscriptions = [];

  // Find the plan
  const plan = db.plans.find(p => p.id === planId);
  if (!plan) throw new Error('Plan not found');

  // Create transaction
  const transaction = {
    id: transactionId,
    userId,
    planId,
    amount: plan.price,
    status: 'completed',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  };
  
  // Create subscription
  const subscription = {
    id: Date.now().toString(),
    userId,
    planId,
    transactionId,
    status: 'active',
    createdAt: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  // Deactivate existing subscriptions for this user
  db.subscriptions = db.subscriptions.map(s => 
    s.userId === userId ? { ...s, status: 'inactive' } : s
  );

  // Add new records
  db.transactions.push(transaction);
  db.subscriptions.push(subscription);

  // Save to database
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

  return { transaction, subscription };
};
  
  return subscription;
};

// Create a new UPI payment
router.post('/upi/create', authenticateToken, async (req, res) => {
  try {
    const { amount, planId, planName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const transactionId = upiPayment.generateTransactionId();
    
    const transaction = {
      id: transactionId,
      userId: req.user.id,
      planId,
      amount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    await saveTransaction(transaction);
    
    const upiLink = upiPayment.generateUPILink({
      amount,
      transactionId,
      purpose: `DevGenius AI - ${planName} Plan`,
      customerName: req.user.username
    });

    res.json({
      upiLink,
      transactionId
    });
  } catch (error) {
    console.error('UPI payment creation error:', error);
    res.status(500).json({ error: 'Failed to create UPI payment' });
  }
});

// Verify UPI payment status
// Get transaction status
router.get('/transaction/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    if (!db.transactions) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    const transaction = db.transactions.find(t => t.id === id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    if (transaction.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(transaction);
  } catch (error) {
    console.error('Error getting transaction:', error);
    res.status(500).json({ error: 'Failed to get transaction' });
  }
});

// Verify payment and activate subscription
router.post('/verify', authenticateToken, async (req, res) => {
  try {
    const { transactionId, planId } = req.body;
    
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    if (!db.transactions) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    const transaction = db.transactions.find(t => t.id === transactionId);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    if (transaction.status === 'completed') {
      return res.status(400).json({ error: 'Transaction already processed' });
    }
    
    // Update transaction status
    transaction.status = 'completed';
    transaction.completedAt = new Date().toISOString();
    
    // Update transactions in db
    db.transactions = db.transactions.map(t => 
      t.id === transactionId ? transaction : t
    );
    
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    
    // Activate the subscription
    const subscription = await activateSubscription(req.user.id, planId, transactionId);

    res.json({ 
      success: true,
      subscription
    });
  } catch (error) {
    console.error('UPI payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Get transaction status
router.get('/transaction/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    if (!db.transactions) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    const transaction = db.transactions.find(t => t.id === id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    // Only return transaction if it belongs to the requesting user
    if (transaction.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(transaction);
  } catch (error) {
    console.error('Error getting transaction:', error);
    res.status(500).json({ error: 'Failed to get transaction' });
  }
});

export default router;
