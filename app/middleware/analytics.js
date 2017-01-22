
const ua = require('universal-analytics');

const visitor = ua(process.env.UA);

const trackHit = (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const device = userAgent.indexOf('Darwin') ? 'ios' : 'android';

    visitor
        .pageview(`/${req.params.station}`)
        .event('device', device)
        .send();

    next();
};

module.exports = (app) => {
    app.use(ua.middleware('UA-XXXX-Y', { cookieName: '_ga' }));
    app.use(trackHit);
};
