const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class GamesToComplete extends Model {}

GamesToComplete.init(
  {
    // define columns
    // id columns for the games to complete table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // foreign key connection for the user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // foreign key connection for the games table
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
    modelName: 'games_to_complete',
  }
);

module.exports = GamesToComplete;