const User = require('./User');
const Game = require('./Game');
const GamesCompleted = require('./GamesCompleted');
const GamesPlaying = require('./GamesPlaying');
const GamesToComplete = require('./GamesToComplete');

// GAMES COMPLETED
// users belong to many games (through GamesCompleted)
User.belongsToMany(Game, {
    through: GamesCompleted,
    foreignKey: 'user_id',
});

Game.belongsToMany(User, {
    foreignKey: 'game_id',
    through: GamesCompleted
});

// GAMES PLAYING 
User.belongsToMany(Game, {
    foreignKey: 'user_id',
    through: GamesPlaying,
});

Game.belongsToMany(User, {
    foreignKey: 'game_id',
    through: GamesPlaying
});

// GAMES TO COMPLETE
User.belongsToMany(Game, {
    foreignKey: 'user_id',
    through: GamesToComplete,
});

Game.belongsToMany(User, {
    foreignKey: 'game_id',
    through: GamesToComplete
})



module.exports = { User, Game, GamesCompleted, GamesPlaying, GamesToComplete };
