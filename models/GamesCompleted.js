const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class GamesCompleted extends Model {}

GamesCompleted.init(
  {
    // define columns
    // id columns for the games completed table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // foregin key connection for the user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // foregin key connection for the games table
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'game',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'games_completed',
  }
);

module.exports = GamesCompleted;