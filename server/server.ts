import express from "express"
import bodyParser from "body-parser";
import cors from "cors";

import { query } from "./mongoClient"
import { basicAuthFilter } from "./filter/basicAuthFilter"

const app = express();

app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(basicAuthFilter)


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


app.get('/basic', async (req, res) => {
    res.send("ok")
})


var server = app.listen(8081, () => {

    // var host = server.address().address
    // var port = server.address().port

    console.log("Server started! ")
})
