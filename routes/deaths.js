import { Router } from "express";
import { db } from "../database.js";
import cors from 'cors'

const router = Router();

const corsOptions = {
    origin: 'https://joaquinbadillo.github.io/BreakIntoValhalla/*',  // Define the allowed origin for CORS requests
    optionsSuccessStatus: 200  // Define the success status code for CORS preflight requests
}

router.get('/:type', cors(corsOptions), (req, res)=>{
    const validDeathPlaces = new Set(["death_place", "death_cause"])
    
    if (!validDeathPlaces.has(req.params["type"])) {
        res.status(400);
        res.json({'message': 'Invalid death type'});
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

router.post('/', cors(corsOptions), (req, res) => {
    db.none('CALL add_death($1, $2, $3)',
        [req.body["username"], req.body["room"], req.body["killer"]])
    .then(() => {
        res.json({'message': 'Death added correctly!'});
    })
    .catch((error) => {
        if (error.message === "Invalid User!") {
            res.status(400);
        }
        else {
            res.status(500);
        }
        res.json(error);
    });
});

export default router;