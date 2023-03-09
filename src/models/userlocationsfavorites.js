'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userLocationsFavorites extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    userLocationsFavorites.init(
        {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            location_id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        {
            sequelize,
            modelName: 'userLocationsFavorites',
        }
    );
    return userLocationsFavorites;
};
