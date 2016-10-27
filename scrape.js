const request = require('request');
const cheerio = require('cheerio');
var express = require('express');
var app = express();

app.get('/station/:station', function (req, res) {
    request(`http://beta.tfgm.com/public-transport/stations/${req.params.station}-tram`, function name(err, resp, body) {
        const $ = cheerio.load(body);
        const arr = [];

        $('#departure-items tr').each(function () {
            arr.push( {
                destination: $(this).find('.departure-destination').text(),
                wait: $(this).find('.departure-wait .figure').text(),
            });
        })

        res.json(arr);
    });

});

app.listen(3000, function () {
});
