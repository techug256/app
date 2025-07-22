const User = require('../models/User');

module.exports = async function updateProfits() {
  try {
    const users = await User.find();

    for (let user of users) {
      const now = new Date();
      const last = new Date(user.lastProfitUpdate);
      const hours = (now - last) / (1000 * 60 * 60);

      if (hours >= 24) {
        const profit = user.capital * 0.1;
        user.profit += profit;
        user.lastProfitUpdate = now;
        await user.save();

        // Pay commissions
        let commissionLevels = [0.10, 0.05, 0.03];
        let currentRef = user.referrer;
        for (let i = 0; i < 3 && currentRef; i++) {
          const refUser = await User.findById(currentRef);
          if (refUser) {
            const reward = profit * commissionLevels[i];
            refUser.commission = (refUser.commission || 0) + reward;
            await refUser.save();
            currentRef = refUser.referrer;
          } else {
            break;
          }
        }
      }
    }

    console.log('Profits + commissions updated.');
  } catch (err) {
    console.error('Profit update failed:', err);
  }
};