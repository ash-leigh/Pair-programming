// var Map = require('./map.js');

var ListView = function(){

}
ListView.prototype = {

populateSelect: function(countries, map) {
  // console.log(countries);
    var parent = document.getElementById('countries');
    // console.log(parent)
    countries.forEach(function(item, index) {
        item.index = index;
        var option = document.createElement("option");
        option.value = index.toString();
        option.text = item.name;
        parent.appendChild(option);
    });
    parent.style.display = 'block';
    parent.addEventListener('change', function (event){
        var index = event.target.value;
        var country = countries[index];
        this.saveToDb(country, map);
    }.bind(this));
    this.populateSavedList(map);
},

populateSavedList: function(map){

  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/countries");
  // request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function(){
    if(request.status === 200){
      console.log(request.responseText);
      var countriesData = JSON.parse(request.responseText);
   
      countriesData.forEach(function(country){
        var ul = document.getElementById('bucket-list');
        var li = document.createElement('li');
        li.innerHTML = country.name;
        ul.appendChild(li);
        map.addMarker({lat: country.lat, lng:country.lng}, country.name)
        console.log(country.lat);
        console.log(country.lng)
      })
    }
  }
  request.send();
},

saveToDb: function(country, map){
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3000/');
  request.setRequestHeader('Content-Type', 'application/json');
  console.log(country);
  request.onload = function(){
    if(request.status === 200){
      console.log(country);
      this.updateDisplay(country, map); 
    }
  }.bind(this)
  request.send(JSON.stringify({
    name: country.name,
    population: country.population,
    lat: country.latlng[0],
    lng: country.latlng[1]

  }));
},

 updateDisplay: function(country, map) {
      var ul = document.getElementById('bucket-list');
      var li = document.createElement('li');
      li.innerHTML = country.name;
      ul.appendChild(li);
      map.addMarker({lat: country.lat, lng:country.lng}, country.name)
}
}

module.exports = ListView;