import db from '../config/db.js';

export default class Post {
    static async createPostTable() {
        await db.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );        
        `)
    }

    static async createPost(userId,title, description) {
        const post = await db.query(`
            INSERT INTO posts (user_id, title , description)
                VALUES ($1, $2, $3) RETURNING *;
            `, [userId, title, description]
        );
        return post.rows[0];
    }

    static async getAllPost() {
        const allPost = await db.query(`
            SELECT * FROM posts;
        `);
        return allPost.rows;
    }

    static async getPostbyId(postId) {
        const post = await db.query(`
            SELECT * FROM posts WHERE id=$1;
            `, [postId]
        );
        console.log(post.rows[0]);
        return post.rows[0];
    }

    static async deletePostbyId(postId) {
        await db.query(`
            DELETE FROM posts WHERE id=$1;
            `, [postId]
        );
        return allPost.rows;
    }
}