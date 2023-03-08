'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // character and episode   N:M
      
    }
  }
  Character.init({
            character_id: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false
            },
            status: {
              type: DataTypes.STRING,
              allowNull: false
            },
            species: {
              type: DataTypes.STRING,
              allowNull: false
            },
            image: {
              type: DataTypes.STRING,
              allowNull: false
            },
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};