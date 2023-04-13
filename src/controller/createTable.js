import User from "../models/users.js";
import Follows from "../models/follows.js";
import Post from "../models/post.js";
import Like from "../models/likes.js";
import Comment from "../models/comment.js";

export default async function createTables() {
    
    await User.createUserTable();
    await Follows.createFollowsTable();
    await Post.createPostTable();
    await Comment.createCommentTable();
    await Like.createLikeTable();
    console.log("tables created!");
};
