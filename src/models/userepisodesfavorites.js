'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userEpisodesFavorites extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    userEpisodesFavorites.init(
        {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            episode_id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        {
            sequelize,
            modelName: 'userEpisodesFavorites',
        }
    );
    return userEpisodesFavorites;
};
