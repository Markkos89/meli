const cUrls = require('./modules/urls/cUrls')

module.exports = app => {
    app.post('/new', cUrls.postNew);
    app.get('/:short_id', cUrls.getShortId);
}