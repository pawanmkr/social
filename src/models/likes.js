import db from '../config/db.js';

export default class Like {
    static async createLikeTable() {
        await db.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                post_id INTEGER NOT NULL REFERENCES posts(id),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `)
    }

    static async likePost(userId, postId) {
        await db.query(`
            INSERT INTO likes (user_id, post_id)
                VALUES ($1, $2);
            `, [userId, postId]
        );
    }

    static async unlikePost(userId, postId) {
        await db.query(`
            DELETE FROM likes WHERE user_id=$1 AND post_id=$2;
            `, [userId, postId]
        );
    }

    static async getLikesbyPost(postId) {
        const likes = await db.query(`
            SELECT * FROM likes WHERE post_id=$1;
            `, [postId]
        );
        return likes;
    }
}