const dns = require('dns');
const { checkIfShortIdExists, shortenURL } = require('../models/mUrls')

module.exports.postNew = (req, res) => {
    let originalUrl;
    try {
        originalUrl = new URL(req.body.url);
    } catch (err) {
        return res.status(400).send({ error: 'invalid URL' });
    }

    dns.lookup(originalUrl.hostname, (err) => {
        if (err) {
            return res.status(404).send({ error: 'Address not found' });
        };
    });
    const { db } = req.app.locals;
    shortenURL(db, originalUrl.href)
        .then(result => {
            const doc = result.value;
            res.json({
                original_url: doc.original_url,
                short_id: doc.short_id,
            });
        })
        .catch(console.error);
}

module.exports.getShortId = (req, res) => {
    const shortId = req.params.short_id;

    const { db } = req.app.locals;
    checkIfShortIdExists(db, shortId)
        .then(doc => {
            if (doc === null) return res.send('We could not find a link at that URL');

            res.json({
                original_url: doc.original_url,
                short_id: doc.short_id,
            });
        })
        .catch(console.error);
}