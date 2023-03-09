'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userCharacterFavorites extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    userCharacterFavorites.init(
        {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            character_id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        {
            sequelize,
            modelName: 'userCharacterFavorites',
        }
    );
    return userCharacterFavorites;
};
