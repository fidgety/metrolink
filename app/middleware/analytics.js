
const ua = require('universal-analytics');

const visitor = ua(process.env.UA);

const trackHit = (req, res, next) => {
    visitor.pageview(`/${req.params.station}`).send();
    next();
};

module.exports = trackHit;
