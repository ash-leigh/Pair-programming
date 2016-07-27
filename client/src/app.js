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
    request.send();
};

var main = function (countries) {
    populateSelect(countries);
    var selected = countries[0];
    // updateDisplay(selected);
    // document.querySelector('#info').style.display = 'block';
}

var populateSelect = function (countries) {
  // console.log(countries);
    var parent = document.getElementById('countries');
    // console.log(parent)
    countries.forEach(function (item, index) {
        item.index = index;
        var option = document.createElement("option");
        option.value = index.toString();
        option.text = item.name;
        parent.appendChild(option);
    });
    parent.style.display = 'block';
    parent.addEventListener('change', function (event){
        var index = this.value;
        var country = countries[index];
        console.log(country);
        saveToDb(country);
        // console.log(country);
        // updateDisplay(country);
        // localStorage.setItem("selectedCountry",JSON.stringify(country));
    });
}

var saveToDb = function(country){
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3000/');
  request.setRequestHeader('Content-Type', 'application/json');
  console.log(country);
  // request.onload = function(){
  //   if(request.status === 200){
      
  //   }
  // }
  request.send(JSON.stringify({
    name: country.name,
    population: country.population,
    lat: country.latlng[0],
    lng: country.latlng[1]

  }));
}

// var updateDisplay = function (lala) {
//     var tags = document.querySelectorAll('#info p');
//     tags[0].innerText = lala.name;
//     tags[1].innerText = lala.population;
//     tags[2].innerText = lala.capital;
// }