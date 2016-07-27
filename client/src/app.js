var ListView = require('./listview.js');
var Map = require('./map.js');

window.onload = function () {
    var map = new Map({lat: 0, lng: 0}, 1);

    var url = 'https://restcountries.eu/rest/v1'
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var countries = JSON.parse(jsonString);
            console.log(countries);
            main(countries, map);
        }
    }
    request.send(null);
};

var main = function (countries, map) {
    var listView = new ListView();
    listView.populateSelect(countries, map);
}

