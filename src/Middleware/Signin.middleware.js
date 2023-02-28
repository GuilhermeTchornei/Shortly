import db from "../Config/database.js";
import bcrypt from 'bcrypt';

export async function SigninMiddleware(req, res, next) {
    const { email, password } = req.body;

    try {
        const userExist = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (userExist.rowCount <= 0) return res.sendStatus(401);
        if (!bcrypt.compareSync(password, userExist.rows[0].password)) return res.sendStatus(401);

        res.locals.userId = userExist.rows[0].id;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}