const request = require('request-promise');
const dedupe = require('dedupe');
const fs = require('fs');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const flatten = results => [].concat(...results);

const save = obj => fs.writeFileSync('./stops.json', JSON.stringify(obj, null, 4));

const mapResults = result => result.items.map(item => ({
    id: item.id.replace('-tram', ''),
    name: item.title.replace(' Tram Stop', '')
}));

const getStops = letter => request({
    url: `https://beta.tfgm.com/api/search?q=${letter}&type=tram-stop-gm`,
    json: true
}).then(mapResults);

Promise.all(letters.map(getStops))
    .then(flatten)
    .then(dedupe)
    .then(save)
    .catch((e) => {
        console.error('something went wrong, sorry', e);
    });
