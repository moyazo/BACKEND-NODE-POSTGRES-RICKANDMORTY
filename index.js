const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const charactersRoutes = require('./src/routes/characters.js');
const db = require('./src/models');
const syncApi = require('./src/routes/syncApi');
const userRouter = require('./src/routes/users');
const authRoutes = require('./src/routes/auth');
const episodesRoutes = require('./src/routes/episode');
const locationsRoutes = require('./src/routes/location');
const usersRoutes = require('./src/routes/users');
const { ensureAuthentication } = require('./src/middelware/auth');

const startApp = async () => {
    const app = express();
    dotenv.config();
    app.use(cors());
    const port = process.env.port;

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.use(ensureAuthentication);
    app.use('/auth', authRoutes);
    app.use('/users', userRouter);
    app.use('/characters', charactersRoutes);
    app.use('/episodes', episodesRoutes);
    app.use('/locations', locationsRoutes);
    app.use('/syncApi', syncApi);

    try {
        await db.sequelize.sync({ force: false });
        app.listen(port, () => {
            console.log('APP running on port ' + port);
        });
    } catch (error) {
        console.log('Error at start up the App' + error.message);
        process.exit(1);
    }
};

startApp();
