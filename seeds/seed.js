const sequelize = require('../config/connection');
const { User, Game, GameStatus } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const gameStatus = require('./GameStatus.json');


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

  const status = await GameStatus.bulkCreate(gameStatus, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);

};

seedDatabase();