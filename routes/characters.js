import { Router } from "express";
import { db } from "../database.js";

const router = Router();

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