const User = require('./User');
const Games = require('./Game');

// User.belongsToMany(Games, {
//   foreignKey: 'user_id',
//   through:,
//   onDelete:'CASCADE'
// })

module.exports = { User, Game };
