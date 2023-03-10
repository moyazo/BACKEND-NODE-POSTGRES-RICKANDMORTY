'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsToMany(models.Character, {
                through: 'userFavoritesCharacters',
                as: 'favoritesCharacters',
                foreignKey: 'user_id',
                onDelete: 'cascade',
            });
            User.belongsToMany(models.Location, {
                through: 'userFavoritesLocations',
                as: 'favoritesLocations',
                foreignKey: 'user_id',
                onDelete: 'cascade',
            });
            User.belongsToMany(models.Episode, {
                through: 'userFavoritesEpisode',
                as: 'favoritesEpisodes',
                foreignKey: 'user_id',
                onDelete: 'cascade',
            });
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
            },
            salt: {
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
