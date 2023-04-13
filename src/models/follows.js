import db from "../config/db.js";
import User from "./users.js";

export default class Follows {
    static async createFollowsTable() {
        await db.query(`
            CREATE TABLE IF NOT EXISTS follows (
                id SERIAL PRIMARY KEY,
                follower INTEGER NOT NULL REFERENCES users(id),
                following INTEGER NOT NULL REFERENCES users(id),
                created_at TIMESTAMP DEFAULT NOW()
            );       
        `);
    }

    static async getFollowers(id) {
        const followers = await db.query(`
            SELECT follower FROM follows WHERE following=$1;
        `, [id]);
        let followerList = await Promise.all(
            followers.rows.map(async element => {
                const name = await User.getFullNamebyId(element.follower);
                return name;
            })
        );
        return followerList;
    }

    static async getFollowing(id) {
        const following = await db.query(`
            SELECT following FROM follows WHERE follower=$1;
        `, [id]);
        let followingList = await Promise.all(
            following.rows.map(async element => {
                const name = await User.getFullNamebyId(element.following);
                return name;
            })
        );
        return followingList;
    }

    static async followUser(user, id) {
        await db.query(`
            INSERT INTO follows (follower, following) 
                VALUES ($1, $2) RETURNING *;
            `, [user.id, id]
        );
    }

    static async unfollowUser(user, id) {
        await db.query(`
            DELETE FROM follows WHERE follower=$1 AND following=$2;
            `, [user.id, id]
        );
    }
};