const cheerio = require('cheerio');

const rows = '#departure-items tr';
const destination = '.departure-destination';
const timeToWait = '.departure-wait .figure';

const parseHtml = (html) => {
    const $ = cheerio.load(html);

    return $(rows).map((i, el) => ({
        destination: $(el).find(destination).text(),
        wait: $(el).find(timeToWait).text(),
    }))
        .toArray()
        .filter(entry => parseInt(entry.wait, 10) > 1);
};

module.exports = parseHtml;
