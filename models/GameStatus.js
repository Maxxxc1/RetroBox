const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class GameStatus extends Model {}

GameStatus.init(
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
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    playing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    wish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,          
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'games_status',
  }
);

module.exports = GameStatus;