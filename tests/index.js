const request = require('supertest');
const nock = require('nock');
const app = require('../index');

const html = '<html><div id="departure-items">' +
                '<tr>' +
                    '<td class="departure-destination">Eccles</td>' +
                    '<td class="departure-wait"><span class="figure">2</span></td>' +
                '</tr>' +
              '</div></html>';

describe('simple API for Metrolink', () => {
    it('should parse times from HTML', (done) => {
        nock('http://beta.tfgm.com')
            .get('/public-transport/stations/piccadilly-tram')
            .reply(200, html);

        request(app)
            .get('/station/piccadilly')
            .expect('Content-Type', /application\/json/)
            .expect([{
                destination: 'Eccles',
                wait: '2'
            }])
            .end(done);
    });
});