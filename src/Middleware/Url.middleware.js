import db from "../Config/database.js";

export async function DELETEUrlMiddleware(req, res, next) {
    const id = req.params.id;
    const userId = res.locals.userId;
    if (isNaN(id) || id <= 0) return res.sendStatus(401);

    try {
        const data = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if (data.rowCount <= 0) return res.sendStatus(404);
        if (data.rows[0].userId !== userId) return res.sendStatus(401);

        res.locals.urlId = data.rows[0].id;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}