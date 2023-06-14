import { Router } from "express";
import { db } from "../database.js";
import cors from 'cors'

const router = Router();

const corsOptions = {
    origin: /https:\/\/joaquinbadillo.github.io\/BreakIntoValhalla\/.*/,  // Define the allowed origin for CORS requests
    optionsSuccessStatus: 200  // Define the success status code for CORS preflight requests
}

function randint(max) {
    return Math.floor((Math.random() * max)) + 1;
}

router.get('/:username', cors(corsOptions), (req, res)=>{
    db.one('SELECT * FROM levels INNER JOIN games USING (level_id) INNER JOIN users USING (game_id) WHERE username = $1', 
        [req.params["username"]])
    .then((data) => {
        console.log(data);
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
    const newSeed = randint(80000);
    db.none('UPDATE levels AS l SET level_num = $1, seed = $2 FROM games AS g INNER JOIN users AS u USING (game_id) WHERE u.username = $3 AND g.level_id = l.level_id', 
        [req.body["level_num"], newSeed, req.body["username"]])
    .then(() => {
        res.json({'seed': newSeed});
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