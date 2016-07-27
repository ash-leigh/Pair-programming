var ListView = require('./listview.js');
window.onload = function () {

    var url = 'https://restcountries.eu/rest/v1'
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var countries = JSON.parse(jsonString);
            console.log(countries);
            main(countries);
        }
    }
    request.send(null);
};

var main = function (countries) {
    var listView = new ListView();
    listView.populateSelect(countries);
}

