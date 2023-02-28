import db from "../Config/database.js";

export async function SignupMiddleware(req, res, next) {
    const user = req.body;

    try {
        const email = await db.query(`SELECT * FROM users where email = $1`, [user.email]);

        if (email.rowCount > 0) return res.sendStatus(409);

        res.locals.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}