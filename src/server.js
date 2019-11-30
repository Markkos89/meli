require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

db(app);
routes(app);

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});