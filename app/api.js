const request = require('request-promise');
const express = require('express');
const cache = require('apicache').middleware;
const parseHtml = require('./utils/parseHtml');
const analytics = require('./middleware/analytics');
const reliableAnalytics = require('./middleware/reliableAnalytics');
const cors = require('./middleware/cors');
const session = require('express-session');

const app = express();

app.use(session({ secret: 'totally not secret', cookie: { maxAge: 600000 } }));
app.use(cors);

app.get('/station/:station',
    analytics,
    reliableAnalytics,
    cache('10 seconds'),
    (req, res) => {
        request(`https://beta.tfgm.com/public-transport/tram/stops/${req.params.station}-tram`)
            .then(parseHtml)
            .then((json) => {
                res.json(json);
            });
    });

module.exports = app;
