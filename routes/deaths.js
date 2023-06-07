import { Router } from "express";
import { db } from "../database.js";

const router = Router();

router.get('/:type', (req, res)=>{
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

router.post('/', (req, res) => {
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