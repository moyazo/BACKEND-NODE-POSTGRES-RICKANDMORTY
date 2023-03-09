const db = require('../models');
const User = db.User;
const Character = db.Character;

const getUserById = async (id) => {
    const user = await User.findByPK(id);
    return user;
};
const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email: email } });
};
const toggleTaskToFavoriteCharacter = async (userId, characterId) => {
    try {
        let user = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password', 'salt'] },
            include: {
                model: db.Character,
                as: 'favoritesCharacters',
            },
        });

        let currentFavList = (user.favoritesCharacters || []).map(
            (item) => item.id
        );
        console.log({currentFavList});
        let existed = currentFavList.includes(characterId);
        console.log(characterId);
        console.log({existed});
        let isAdded = false;

        if (!existed) {
            const character = await Character.findOne({
                where: { id: characterId },
            });

            if (!character) {
                throw new Error('Character not found');
            }

            await user.addFavoritesCharacters(character);
            isAdded = true;
        } else {
            const newList = currentFavList.filter(
                (item) => item !== characterId
            );
            await user.setFavoritesCharacters(newList);
            isAdded = false;
        }

        const characters = await Character.findAll({
            where: { id: currentFavList },
        });

        user.favoritesCharacters = characters;

        return { user, isAdded };
    } catch (error) {
        console.log('Error in toggleTaskToFavoriteCharacter', error.message);
    }
};
const toggleTaskToFavoriteLocation = async ({ id, locationId }) => {
    let user = await User.findByPK(id);
    let currentFavList = user.get('favorites');
    let newFavsList = currentFavList
        .filter(() => true)
        .map((id_) => Number(id_));

    const existed = currentFavList.includes(Number(locationId));
    let isAdded = false;

    if (existed) {
        newFavsList = currentFavList.filter(
            (item) => Number(item) !== Number(locationId)
        );
    } else {
        const fav = await Character.findByPK(locationId);
        if (!fav) {
            throw new Error('No exists data in database');
        } else {
            newFavsList.push(locationId);
            isAdded = true;
        }
    }

    await User.update({ favorites: newFavsList }, { where: { id: id } });
    user = await User.findByPK(id, {
        attributes: { exclude: ['password', 'salt'] },
    });

    return { user: user, isAdded: isAdded };
};
const toggleTaskToFavoriteEpisode = async ({ id, episodeId }) => {
    let user = await User.findByPK(id);
    let currentFavList = user.get('favorites');
    let newFavsList = currentFavList
        .filter(() => true)
        .map((id_) => Number(id_));

    const existed = currentFavList.includes(Number(episodeId));
    let isAdded = false;

    if (existed) {
        newFavsList = currentFavList.filter(
            (item) => Number(item) !== Number(episodeId)
        );
    } else {
        const fav = await Character.findByPK(episodeId);
        if (!fav) {
            throw new Error('No exists data in database');
        } else {
            newFavsList.push(episodeId);
            isAdded = true;
        }
    }

    await User.update({ favorites: newFavsList }, { where: { id: id } });
    user = await User.findByPK(id, {
        attributes: { exclude: ['password', 'salt'] },
    });

    return { user: user, isAdded: isAdded };
};

module.exports = {
    toggleTaskToFavoriteCharacter,
    toggleTaskToFavoriteLocation,
    toggleTaskToFavoriteEpisode,
    getUserByEmail,
    getUserById,
};
