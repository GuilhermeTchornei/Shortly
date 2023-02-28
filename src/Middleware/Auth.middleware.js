import db from "../Config/database.js";

export async function AuthMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
        if (session.rowCount <= 0) return res.sendStatus(401);

        res.locals.userId = session.rows[0].userId;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}