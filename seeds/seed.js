const sequelize = require('../config/connection');
const { User, Game, GamesCompleted } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const CompletedData = require('./gamesCompleted.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const games = await Game.bulkCreate(gameData, {
    individualHooks: true,
    returning: true,
  });

  const gameCompleted = await GamesCompleted.bulkCreate(CompletedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);

};

seedDatabase();