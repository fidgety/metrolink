const request = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

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

app.get('/station/:station', (req, res) => {
    request(`http://beta.tfgm.com/public-transport/stations/${req.params.station}-tram`)
        .then(parseHtml)
        .then((json) => {
            res.json(json);
        });
});

module.exports = app;
