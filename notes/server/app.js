let bodyparser = require('body-parser');
let express = require('express');
let app = express();
let api = require('./api/v1');
let cors = require('cors');
let swaggerUi = require('swagger-ui-express');
let yaml = require('yamljs');
let path = require('path');

//write your logic here
let modules = require('./modules');

modules.initializeMongooseConnection();

//set middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(cors());

//swagger setup
const apiSpec = path.resolve(__dirname, '..', 'api-spec-swagger.yaml'); 
const swaggerDoc = yaml.load(apiSpec);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/v1/',api);


app.use((req,res) => {
    let error = {
        message : "Incorrect url",
        status: 404
    }
    res.status(error.status).send(error);
})

module.exports = app;