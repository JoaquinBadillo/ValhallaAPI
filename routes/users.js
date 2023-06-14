import { Router } from "express";
import { db } from "../database.js";
import cors from 'cors'

const router = Router();

const corsOptions = {
    origin: 'https://joaquinbadillo.github.io/BreakIntoValhalla/',  // Define the allowed origin for CORS requests
    optionsSuccessStatus: 200  // Define the success status code for CORS preflight requests
}

router.post('/login', cors(corsOptions), (req, res)=>{
    db.one('SELECT * FROM users WHERE username = $1 AND password = $2', 
        [req.body["username"], req.body["password"]])
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

router.post("/", cors(corsOptions), (req, res) => {
    db.none('CALL create_user($1, $2, $3)',
        [req.body["username"], req.body["email"], req.body["password"]])
    .then(() => {
        res.json({'message': 'User created correctly!'});
    })
    .catch((error) => {
        if (error.message === "User already exists") {
            res.status(400);
        }
        else {
            res.status(500);
        }
        res.json(error);
    });
});

export default router;