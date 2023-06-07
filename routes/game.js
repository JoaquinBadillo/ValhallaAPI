import { Router } from "express";
import { db } from "../database.js";

const router = Router();

function randint(max) {
    return Math.floor((Math.random() * max)) + 1;
}

router.post('/', (req, res)=>{
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