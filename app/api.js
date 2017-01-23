const request = require('request-promise');
const express = require('express');
const cache = require('apicache').middleware;
const parseHtml = require('./utils/parseHtml');
const analytics = require('./middleware/analytics');
const reliableAnalytics = require('./middleware/reliableAnalytics');
const cors = require('./middleware/cors');

const app = express();

app.use(cors);

app.get('/station/:station',
    analytics,
    reliableAnalytics,
    cache('10 seconds'),
    (req, res) => {
        request(`http://beta.tfgm.com/public-transport/stations/${req.params.station}-tram`)
            .then(parseHtml)
            .then((json) => {
                res.json(json);
            });
    });

module.exports = app;
