export default async function getAuthToken(req) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(token === null) res.sendStatus(401);
    return token;
}