const sequelize = require('../config/connection');
const { User, Game, GamesCompleted, GamesPlaying, GamesToComplete } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const completedData = require('./gamesCompleted.json');
const toCompleteData = require('./gamesPlaying.json');
const playingData = require('./gamesToComplete.json');

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

  const gameCompleted = await GamesCompleted.bulkCreate(completedData, {
    individualHooks: true,
    returning: true,
  });

  const gamePlaying = await GamesPlaying.bulkCreate(playingData, {
    individualHooks: true,
    returning: true,
  });

  const gameToComplete = await GamesToComplete.bulkCreate(toCompleteData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);

};

seedDatabase();