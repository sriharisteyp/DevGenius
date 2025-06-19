import CreditModel from '../models/Credit.js';

export const getUserCredits = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const { usage, subscription, plan } = await CreditModel.getUserCredits(userId);
    
    // Get the appropriate plan limit
    let totalCredits;
    if (plan && plan.messagesPerMonth) {
      totalCredits = plan.messagesPerMonth;
    } else if (plan && plan.features) {
      // Try to extract from features if it's mentioned there
      const messageFeature = plan.features.find(f => f.includes('AI requests'));
      if (messageFeature) {
        const match = messageFeature.match(/(\d+)/);
        totalCredits = match ? parseInt(match[0]) * 30 : 150; // Default to 150 if can't parse
      } else {
        totalCredits = 150; // Default monthly limit
      }
    } else {
      totalCredits = 150; // Default monthly limit
    }

    // Check if we need to reset the count (if it's a new month)
    const lastReset = new Date(usage.lastResetDate);
    const now = new Date();
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
      await CreditModel.resetUsageCount(userId);
      usage.count = 0;
    }

    res.json({
      usedCredits: usage.count,
      totalCredits,
      planName: plan?.name || 'Free',
      subscription: subscription || null
    });
  } catch (error) {
    console.error('Error in getUserCredits controller:', error);
    res.status(500).json({ 
      error: 'Failed to get user credits',
      message: error.message
    });
  }
};

export const updateCredits = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUsage = await CreditModel.updateMessageCount(userId);
    
    res.json({
      success: true,
      newCount: updatedUsage.count
    });
  } catch (error) {
    console.error('Error in updateCredits controller:', error);
    res.status(500).json({ 
      error: 'Failed to update credits',
      message: error.message
    });
  }
};
