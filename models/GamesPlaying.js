const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class GamesPlaying extends Model {}

GamesPlaying.init(
  {
    // define columns
    // id columns for the games playing table
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
    modelName: 'games_playing',
  }
);

module.exports = GamesPlaying;