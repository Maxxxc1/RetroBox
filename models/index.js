const User = require('./User');
const Game = require('./Game');
const GameStatus = require('./GameStatus');


// GAMES satus
// users belong to many games (through GameStatus)
User.belongsToMany(Game, {
    through: GameStatus,
    foreignKey: 'user_id',
});

Game.belongsToMany(User, {
    foreignKey: 'game_id',
    through: GameStatus,
});

Game.belongsToMany(GameStatus, {
    foreignKey: 'game_id',
    through: User,
});

module.exports = { User, Game, GameStatus};
