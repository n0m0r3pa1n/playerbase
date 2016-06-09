var dbUri = 'mongodb://localhost/playerbase'
var clearDB = require('mocha-mongoose')(dbUri);

afterEach(function (done) {
    clearDB(function(err) {
        done()
    })
})