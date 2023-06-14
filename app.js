import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import ratelimit from 'express-rate-limit'

const limiter = ratelimit({
    // (8 requests per 10 minutes)
    windowMs: 10 * 60 * 1000,
    max: 8 
})

dotenv.config();

const app = express();
app.use(cors());
app.use(limiter);
app.use(express.json());

const port = process.env.PORT || 3000;

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

app.listen(port, "0.0.0.0", () => {
    console.log("Server is running");
});
