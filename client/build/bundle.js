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
/***/ function(module, exports) {

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

/***/ }
/******/ ]);