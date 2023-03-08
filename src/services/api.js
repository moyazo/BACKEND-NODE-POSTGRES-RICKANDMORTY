const db = require('../models');
const Character = db.Character;
const Episode = db.Episode;
const Location = db.Location;

async function apiCharactersList() {
    try {
        for (let i = 1; i < 11; i++) {
            const response = await fetch(
                `https://rickandmortyapi.com/api/character?page=${i}`
            );
            const data = await response.json();
            const results = data.results;
            const responseResults = results.map((result) => ({
                character_id: result.id,
                name: result.name,
                status: result.status,
                species: result.species,
                image: result.image,
            }));

            const characterToCreate = [];
            const existedResults = await Character.findAll();

            for (const item of responseResults) {
                const match = existedResults.find(
                    (existedResult) =>
                        existedResult.character_id === item.character_id
                );
                if (!match) {
                    characterToCreate.push(item);
                }
            }
            if (characterToCreate.length > 0) {
                Character.bulkCreate(characterToCreate);
            }
            await apiEpisodesList();
        }
    } catch (error) {
        console.log('Error al sincronizar los personajes ' + error.message);
    }
}

async function apiEpisodesList() {
    try {
        for (let i = 1; i < 4; i++) {
            const response = await fetch(
                `https://rickandmortyapi.com/api/episode?page=${i}`
            );
            const data = await response.json();
            const results = data.results;

            const responseResults = results.map((result) => ({
                episode_id: result.id,
                name: result.name,
                air_date: result.air_date,
                episode: result.episode,
            }));
            const episodesToCreate = [];
            const existedResults = await Episode.findAll();

            for (const item of responseResults) {
                const match = existedResults.find(
                    (existedResult) =>
                        existedResult.episode_id === item.episode_id
                );
                if (!match) {
                    episodesToCreate.push(item);
                }
            }

            if (episodesToCreate.length > 0) {
                Episode.bulkCreate(episodesToCreate);
            }
            await apiLocationsList();
        }
    } catch (error) {
        console.log('Error al sincronizar episodes ' + error.message);
    }
}

async function apiLocationsList() {
    try {
        for (let i = 1; i < 8; i++) {
            const response = await fetch(
                `https://rickandmortyapi.com/api/location?page=${i}`
            );
            const data = await response.json();
            const results = data.results;

            const responseResults = results.map((response) => ({
                location_id: response.id,
                name: response.name,
                type: response.type,
                dimension: response.dimension,
            }));

            const locationsToCreate = [];
            const existedResults = await Location.findAll();

            for (const item of responseResults) {
                const match = existedResults.find(
                    (existedResult) =>
                        existedResult.location_id === item.location_id
                );
                if (!match) {
                    locationsToCreate.push(item);
                }
            }

            if (locationsToCreate.length > 0) {
                Location.bulkCreate(locationsToCreate);
            }
        }
    } catch (error) {
        console.log('Error al sincronizar las locations ' + error.message);
    }
}

module.exports = {
    apiCharactersList,
    apiEpisodesList,
    apiLocationsList,
};
