import db from "../Config/database.js";

export async function GETRanking(req, res) {
    try {
        const ranking = await db.query(`
        SELECT users.id AS id, users.name AS name,
        COUNT(urls.id) AS "linksCount",
        COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10`);
        res.send(ranking.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}