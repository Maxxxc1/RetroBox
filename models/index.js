const User = require('./User');
const Game = require('./Game');
const GamesCompleted = require('./GamesCompleted');
const GamesPlaying = require('./GamesPlaying');
const GamesToComplete = require('./GamesToComplete');

// User.belongsToMany(Games, {
//   foreignKey: 'user_id',
//   through:,
//   onDelete:'CASCADE'
// })

module.exports = { User, Game, GamesCompleted,GamesPlaying,GamesToComplete};
