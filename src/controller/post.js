import User from "../models/users.js";
import Post from "../models/post.js";
import Like from "../models/likes.js";
import Comment from "../models/comment.js";
import getAuthToken from "../utils/getAuthToken.js";

async function createPost(req, res, next) {
    const { title, description } = req.body;
    if (!title || !description) res.sendStatus(404);

    const token = await getAuthToken(req);
    const user = await User.getUserFromDB(token);

    const post = await Post.createPost(user.id, title, description);
    res.send(post);
}

async function deletePost(req, res, next) {
    const postId = req.params.id;
    await Post.deletePostbyId(postId);
    res.send(201);
}

async function getPost(req, res, next) {
    const postId = req.params.id;
    const post = await Post.getPostbyId(postId);
    const likes = await Like.getLikesbyPost(post.id);
    const comments = await Comment.getCommentsbyPost(post.id);
    res.send({
        postId: post.id,
        likes: likes.rowCount,
        comments: comments.rowCount
    });
}

async function getAllPost(req, res, next) {
    const post = await Post.getAllPost();
    post.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const allPosts = await Promise.all(
        post.map(async element => {
            let comments = await Comment.getCommentsbyPost(element.id);
            comments = await Promise.all(
                comments.rows.map(async comment => {
                    return await comment.content;
                })
            );
            const likes = await Like.getLikesbyPost(element.id);
            return {
                id: element.id,
                title: element.title,
                description: element.description,
                created_at: element.created_at,
                comments: comments,
                likes: likes.rowCount
            }
        })
    )
    res.send(allPosts);
}

async function likePost(req, res, next) {
    const postId = req.params.id;
    const token = await getAuthToken(req);
    const user = await User.getUserFromDB(token);
    await Like.likePost(user.id, postId);
    res.send(201);
}

async function unlikePost(req, res, next) {
    const postId = req.params.id;
    const token = await getAuthToken(req);
    const user = await User.getUserFromDB(token);
    await Like.unlikePost(user.id, postId);
    res.send(201);
}

async function doComment(req, res, next) {
    const postId = req.params.id;
    
    const token = await getAuthToken(req);
    const user = await User.getUserFromDB(token);
    const comment = await Comment.createComment(user.id, postId, req.body.comment);
    res.send({
        commentId: comment.id
    });
}

export {
    createPost,
    deletePost,
    likePost,
    unlikePost,
    doComment,
    getPost,
    getAllPost
}