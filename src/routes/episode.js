const router = require('express').Router();
const {
    getEpisodeList,
    getEpisodeById,
    createEpisode,
    updateEpisode,
    removeEpisode,
} = require('../controllers/episode');
const getUserByEmail = require('../controllers/users.js').getUserByEmail;

router.get('/', async (request, response) => {
    try {
        const episode = await getEpisodeList();
        response.status(200).json(episode);
    } catch (error) {
        response.status(500);
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const episode = await getEpisodeById(id);
        response.status(200).json(episode);
    } catch (error) {
        response.status(500);
    }
});

router.post('/', async (request, response) => {
    try {
        const data = request.body;
        const episode = await createEpisode(data);
        response.status(200).json(episode);
    } catch (error) {
        response.status(500);
    }
});

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const data = request.body;
        const episode = await updateEpisode(id, data);
        response.status(200).json(episode);
    } catch (error) {
        response.status(500);
    }
});

routerUser.get('/id/:token', async (req, res) => {
    try {
        const payload = jsonwebtoken.decode(
            req.params.token,
            process.env.TOKEN_SECRET
        );
        const data = await getUserByEmail(payload.email);
        const userId = {
            id: data.id,
        };
        res.status(200).json(userId);
    } catch (error) {
        res.status(500).json('Error at bring userId for post' + error.message);
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        await removeEpisode(id);
        response.status(200).json(true);
    } catch (error) {
        response.status(500);
    }
});

module.exports = router;
