const express = require("express");
const DataStore = require("nedb");
const cors = require('cors');
const bodyParser = require('body-parser');


// Самая простая база данных, что я нашел

const db = new DataStore({ filename: "posts.db", autoload: true });
const app = express();
// req = request

//res = response
// app.use(function(request, response, next) {
//     //   Access-Control-Allow-Origin
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Origin-Headers", "*");
//     response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
// })

app.use(cors());
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (request, response) => {

    db.find({}, (error, posts) => {

        response.json(posts);

    });

});



// app.get("/post/:message", (request, response) => {

//     const { message } = request.params;

//     db.insert({ message });

// });



app.post("/post", (request, response) => {

    const { body } = request;

    console.log(body);
    // console.log(response);

    db.insert(body);

    response.send({
        body: 'ok'
    });
});
ы


app.listen(() => console.log("listening"));