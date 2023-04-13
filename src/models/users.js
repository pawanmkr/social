import db from '../config/db.js';

export default class User {
    static async createUserTable() {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                session_token TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `)
    }

    static async getUserFromDB(session_token) {
        const user = await db.query(`
            SELECT * FROM users WHERE session_token=$1;
        `, [session_token]);
        return user.rows[0];
    }

    static async getFullNamebyId(id) {
        const full_name = await db.query(`
            SELECT full_name FROM users WHERE id=$1;
            `, [id]
        );
        return full_name.rows[0].full_name;
    }
}