import * as dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.API_PORT;

// Welcome message on root route
app.get('/', (req, res)=> {
    res.json({"message": "Valhalla API"});
});

// API Routers
import metricsRouter from './routes/metrics.js';
import levelsRouter from './routes/levels.js';
import gameRouter from './routes/game.js';
import charactersRouter from './routes/characters.js';
import usersRouter from './routes/users.js';
import deathsRouter from './routes/deaths.js';

// Setting up the routes:
app.use('/api/users/metrics', metricsRouter);
app.use('/api/levels', levelsRouter);
app.use('/api/game', gameRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/users', usersRouter);
app.use('/api/deaths', deathsRouter);

app.listen(port);