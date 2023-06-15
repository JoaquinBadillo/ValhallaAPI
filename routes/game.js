import { Router } from "express";
import { db } from "../database.js";
import cors from 'cors'

const router = Router();

const corsOptions = {
    origin: "https://joaquinbadillo.github.io",  // Define the allowed origin for CORS requests
    optionsSuccessStatus: 200  // Define the success status code for CORS preflight requests
}

function randint(max) {
    return Math.floor((Math.random() * max)) + 1;
}

router.post('/', cors(corsOptions), (req, res)=>{
    const seed = randint(80000);

    db.none(`CALL create_game($1, $2, ${seed})`, 
        [req.body["username"], req.body["character_id"]])
    .then(() => {
        res.json({'seed': seed});
    })
    .catch((error) => {
        if (error.message === "Game already exists") {
            res.status(400);
        }
        else {
            res.status(500);
        }
        res.json(error);
    });
});

export default router;