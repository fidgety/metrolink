
const ua = require('universal-analytics');

const visitor = ua(process.env.UA);

const trackHit = (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const device = userAgent.indexOf('Darwin') ? 'android' : 'ios';

    visitor
        .pageview(`/${req.params.station}`)
        .event('device', device)
        .send();

    next();
};

module.exports = trackHit;
