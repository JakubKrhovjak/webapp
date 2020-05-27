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
    const a = await query("users", coll => coll.findOne({username: "test@ahoj.cz"}));

    res.send('Hello World');
})


app.post('/sign-in', async (req, res) => {
    const user = await query("users", coll => coll.findOne(req.body));
    return res.send(user);
})


var server = app.listen(8081, () => {

    // var host = server.address().address
    // var port = server.address().port

    console.log("Server started! ")
})
