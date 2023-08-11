const db = require('../config/connection');
const { users, expenses } = require('../models');
const usersSeeds = require('./usersSeeds.json');
const expensesSeeds = require('./expensesSeeds.json');

db.once('open', async () => {
  try {
    await expenses.deleteMany({});
    await users.deleteMany({});

    await User.create(usersSeeds);

    for (let i = 0; i < expensesSeeds.length; i++) {
      const { _id, expenses } = await expenses.create(expensesSeeds[i]);
      const user = await users.findOneAndUpdate(
        { username: expenses },
        {
          $addToSet: {
            expenses: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
