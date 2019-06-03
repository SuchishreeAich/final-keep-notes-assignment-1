let bodyparser = require('body-parser');
let express = require('express');
let app = express();
let api = require('./api/v1');
let cors = require('cors');

//write your logic here
let modules = require('./modules');

modules.initializeMongooseConnection();

//set middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(cors());

app.use('/api/v1/',api);

// app.get('/', (req , res) => {
//     res.send('auth ok');
// })


app.use((req,res) => {
    let error = {
        message : "Incorrect url",
        status: 404
    }
    res.status(error.status).send(error);
})

module.exports = app;