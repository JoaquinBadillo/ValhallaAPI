import { Router } from "express";
import { db } from "../database.js";
import cors from 'cors'

const router = Router();

const corsOptions = {
    origin: 'https://joaquinbadillo.github.io/BreakIntoValhalla/*',  // Define the allowed origin for CORS requests
    optionsSuccessStatus: 200  // Define the success status code for CORS preflight requests
}

router.get('/leaderboards/:type', cors(corsOptions), (req, res)=>{
    const validLeaderboards = new Set(["top_kills", "top_weekly_elims"])
    
    if (!validLeaderboards.has(req.params["type"])) {
        res.status(400);
        res.json({'message': 'Invalid leaderboard type'});
        return;
    }

    db.any(`SELECT * FROM ${req.params["type"]}`, [])
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        if (error.message === "No data returned from the query.") {
            res.status(404);
        }
        else {
            res.status(500);
        }
        res.json(error);
    });
});

router.put('/', cors(corsOptions), (req, res)=>{
    db.none('UPDATE metrics AS m SET kills = m.kills + $1, wins = m.wins + $2 FROM users AS u WHERE u.username = $3 AND u.metrics_id = m.metrics_id', 
        [req.body["kills"], req.body["wins"], req.body["username"]])
    .then(() => {
        res.json({'message': 'Data updated correctly!'});
    })
    .catch((error) => {
        if (error.message === "No data returned from the query.") {
            res.status(404);
        }
        else {
            res.status(500);
        }
        res.json(error);
    });
});

export default router;