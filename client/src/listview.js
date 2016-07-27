var ListView = function(){

}
ListView.prototype = {

populateSelect: function(countries) {
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
        this.saveToDb(country);
    }.bind(this));
    this.populateSavedList();
},

populateSavedList: function(){

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
      })
    }
  }
  request.send();
},

saveToDb: function(country){
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3000/');
  request.setRequestHeader('Content-Type', 'application/json');
  console.log(country);
  request.onload = function(){
    if(request.status === 200){
      console.log(country);
      this.updateDisplay(country); 
    }
  }.bind(this)
  request.send(JSON.stringify({
    name: country.name,
    population: country.population,
    lat: country.latlng[0],
    lng: country.latlng[1]

  }));
},

 updateDisplay: function(country) {
      var ul = document.getElementById('bucket-list');
      var li = document.createElement('li');
      li.innerHTML = country.name;
      ul.appendChild(li);
}
}

module.exports = ListView;