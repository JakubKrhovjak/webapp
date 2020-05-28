import express from "express"
import bodyParser from "body-parser";
import cors from "cors";

import { query } from "./mongoClient"

const app = express();

app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3000",
}))


app.get('/', async function (req, res) {
    res.send('Hello World');
})


app.post('/sign-in', async (req, res) => {
    const user = await query("users", coll => coll.findOne(req.body));
    return res.send(user);
})

app.post('/new-account', async (req, res) => {
    await query("users", coll => coll.insertOne(req.body))
    return res.send(req.body);
})

app.get('/login', async (req, res) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const user = await query("users", coll => coll.findOne({username}));
    if(user.password === password) {
        res.status(200).json("ok")
    } else {
        res.status(401).json("Invalid credential")
    }

})

app.get('/basic', async (req, res) => {
    res.send("ok")
})


var server = app.listen(8081, () => {

    // var host = server.address().address
    // var port = server.address().port

    console.log("Server started! ")
})
