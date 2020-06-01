import {query} from "../mongoClient";

export const basicAuthFilter = async (req, res, next) => {
    if (req.path !== '/login') {
        return next();
    }

    if (!req.headers.authorization || req.headers.authorization.indexOf("Basic ") === -1) {
        return res.status(401).json({ message: "Missing Authorization Header" });
    }

    const base64Credentials =  req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(':');

    const user = await query("users", coll => coll.findOne({username}));
    if(user.password === password) {
        res.status(200).json("ok");
    } else {
        res.status(401).json("Invalid credential")
    }
    next();
}

