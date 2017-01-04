const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const apicache = require('apicache');
const ua = require('universal-analytics');

const visitor = ua(process.env.UA);

const app = express();
const cache = apicache.middleware;

const rows = '#departure-items tr';
const destination = '.departure-destination';
const timeToWait = '.departure-wait .figure';

const parseHtml = (html) => {
    const $ = cheerio.load(html);

    return $(rows).map((i, el) => ({
        destination: $(el).find(destination).text(),
        wait: $(el).find(timeToWait).text(),
    })).toArray();
};

const trackHit = (req, res, next) => {
    visitor.pageview(`/${req.params.station}`).send();
    next();
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/station/:station',
    trackHit,
    cache('10 seconds'),
    (req, res) => {
        request(`http://beta.tfgm.com/public-transport/stations/${req.params.station}-tram`)
            .then(parseHtml)
            .then((json) => {
                res.json(json);
            });
    });

module.exports = app;
