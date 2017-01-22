
const ua = require('universal-analytics');

const visitor = ua(process.env.UA);

const trackHit = (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const device = userAgent.indexOf('Darwin') > 0 ? 'ios' : 'android';

    visitor
        .pageview(`/${req.params.station}`)
        .event('device', device)
        .send();

    next();
};

module.exports = trackHit;
