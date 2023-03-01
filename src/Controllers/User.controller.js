import db from "../Config/database.js";

export async function GETuser(_, res) {
    const id = res.locals.userId;

    try {
        const data = await db.query(
            `SELECT users.id AS id, users.name AS name, SUM(urls."visitCount") AS "visitCount",
            json_agg(
                json_build_object(
                    'id', urls.id,
                    'shortUrl', urls."shortUrl",
                    'url', urls.url, 'visitCount',
                    urls."visitCount")) as "shortenedUrls"
            FROM urls
            JOIN users ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id`, [id]);
        res.send(data.rows[0]);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}