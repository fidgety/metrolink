const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/trams';

let connection = {};

MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err);
    }
    connection = db.collection('stations');
});

const trackHit = (req, res, next) => {
    const station = req.params.station;
    const userAgent = req.headers['user-agent'] || '';
    const device = userAgent.indexOf('Darwin') > 0 ? 'ios' : 'android';

    connection.insertOne({
        station,
        date: new Date(),
        device,
        userAgent
    }, err => console.log);
    next();
};

module.exports = trackHit;
