const nanoid = require('nanoid');

module.exports.shortenURL = (db, url) => {
    const shortenedURLs = db.collection('shortenedURLs');
    return shortenedURLs.findOneAndUpdate({ original_url: url },
        {
            $setOnInsert: {
                original_url: url,
                short_id: nanoid(7),
            },
        },
        {
            returnOriginal: false,
            upsert: true,
        }
    );
};

module.exports.checkIfShortIdExists = (db, code) => db.collection('shortenedURLs')
    .findOne({ short_id: code });