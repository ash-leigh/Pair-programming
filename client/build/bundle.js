/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ListView = __webpack_require__(1);
	var Map = __webpack_require__(2);

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



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(2);

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
	  map.addMarker({lat: country.latlng[0], lng:country.latlng[1]}, country.name)
	}
	}

	module.exports = ListView;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Map = function(latLng, zoom){
	  this.googleMap = new google.maps.Map(document.getElementById('map'), {
	    center: latLng,
	    zoom: zoom
	  })

	  this.addMarker = function(latLng, title){
	    var marker = new google.maps.Marker({
	      position: latLng,
	      map: this.googleMap,
	      title: title
	    })
	    return marker;
	  }
	}

	module.exports = Map;

/***/ }
/******/ ]);