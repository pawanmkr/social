import db from '../config/db.js';

export default class Comment {
    static async createCommentTable() {
        await db.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                post_id INTEGER NOT NULL REFERENCES posts(id),
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );                       
        `)
    }

    static async createComment(userId, postId, content) {
        const comment = await db.query(`
            INSERT INTO comments (user_id, post_id, content)
                VALUES ($1, $2, $3) RETURNING *;
            `, [userId, postId, content]
        );
        return comment.rows[0];
    }

    static async getCommentsbyPost(postId) {
        const comments = await db.query(`
            SELECT * FROM comments WHERE post_id=$1;
            `, [postId]
        );
        return comments;
    }
}