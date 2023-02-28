import { nanoid } from "nanoid";
import db from "../Config/database.js";

export async function POSTUrl(req, res) {
    const { url } = req.body;
    const shortUrl = nanoid(10);
    const userId = res.locals.userId;

    try
    {
        const data = await db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`, [url, shortUrl, userId]);
        res.status(201).send({ id: data.rows[0].id, shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function GETUrlById(req, res) {
    const id = req.params.id;

    try {
        const data = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id]);
        if (data.rowCount <= 0) return res.sendStatus(404);
        res.status(200).send(data.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function OpenUrl(req, res) {
    const shortUrl = req.params.shortUrl;

    try {
        const data = await db.query(`SELECT url FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        if (data.rowCount <= 0) return res.sendStatus(404);
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`, [shortUrl]);
        res.redirect(`https://${data.rows[0].url}`);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function DELETEUrl(_, res) {
    const id = res.locals.urlId;

    try {
        await db.query(`DELETE FROM urls WHERE id = $1`, [id]);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}