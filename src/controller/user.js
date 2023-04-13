import User from "../models/users.js";
import Follows from "../models/follows.js";
import getAuthToken from "../utils/getAuthToken.js";

async function getUserProfile(req, res, next) {
    const user = await User.getUserFromDB(await getAuthToken(req));
    const followers = await Follows.getFollowers(user.id);
    const following = await Follows.getFollowing(user.id);
    res.send({
        username: user.full_name,
        followers: followers,
        following: following
    })
}

async function followUser(req, res, next) {
    const user = await User.getUserFromDB(await getAuthToken(req));
    const id = req.params.id; // this is the ID of the user to be followed
    await Follows.followUser(user, id);
    res.sendStatus(201);
}

async function unfollowUser(req, res, next) {
    const user = await User.getUserFromDB(await getAuthToken(req));
    const id = req.params.id; // this is the ID of the user to be followed
    await Follows.unfollowUser(user, id);
    res.sendStatus(201);
}

export {
    getUserProfile,
    followUser,
    unfollowUser
}