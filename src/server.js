require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const routes = require('./routes');

const databaseUrl = process.env.DATABASE;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        app.locals.db = client.db('shortener');
    })
    .catch((err) => console.error('Failed to connect to the database ' + err));

routes(app);

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});