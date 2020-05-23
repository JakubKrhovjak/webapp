import express  from "express"
const  app = express();

app.get('/', function (req, res) {

    res.send('Hello World');
})


app.get('/sign-in', function (req, res) {
    res.send('Hello World');
})




var server = app.listen(8081,  () => {
    // var host = server.address().address
    // var port = server.address().port

    console.log("Server started! " )
})