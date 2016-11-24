const request = require('request-promise');
const dedupe = require('dedupe');
const fs = require('fs');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const flatten = results => [].concat.apply([], results);
const save = obj => fs.writeFileSync('./stops.json', JSON.stringify(obj, null, 4));

Promise.all(letters.map(letter => request(`https://beta.tfgm.com/api/search?q=${letter}&type=tram-stop-gm`)
        .then(body => JSON.parse(body).items)
        .then(items => items.map(item => ({
            id: item.id.replace('-tram', ''),
            name: item.title
        })))
    ))
    .then(flatten)
    .then(dedupe)
    .then(save);
