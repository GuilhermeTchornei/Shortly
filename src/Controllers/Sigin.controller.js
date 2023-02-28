import { v4 as uuid } from 'uuid';
import db from '../Config/database.js';

export async function SigninController(_, res) {
    const id = res.locals.userId;
    const token = uuid();

    try {
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token]);

        res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}