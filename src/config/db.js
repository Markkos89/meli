const { MongoClient } = require('mongodb');
const databaseUrl = process.env.DATABASE;

module.exports = app => {
    MongoClient.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            app.locals.db = client.db('shortener');
        })
        .catch((err) => console.error('Failed to connect to the database ' + err));
}
