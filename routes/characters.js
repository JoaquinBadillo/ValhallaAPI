import { Router } from "express";
import { db } from "../database.js";
import cors from 'cors'

const router = Router();

const corsOptions = {
    origin: "https://joaquinbadillo.github.io",  // Define the allowed origin for CORS requests
    optionsSuccessStatus: 200  // Define the success status code for CORS preflight requests
}

router.get('/stats', (req, res)=>{
    db.any('SELECT * FROM stats')
    .then((data) => {
        res.json(data);
    })
    .catch((error) => {
        res.status(500);
        res.json(error);
    });
});

router.get('/:username', (req, res)=> {
    db.one('SELECT character_id FROM users INNER JOIN games USING (game_id) INNER JOIN characters USING (character_id) WHERE username = $1',
        [req.params["username"]])
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

router.get('/:character_id/stats', (req, res)=>{
    db.one('SELECT * FROM stats INNER JOIN classes USING (stats_id) INNER JOIN characters USING (class_id) WHERE character_id = $1', 
        [req.params["character_id"]])
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


export default router;