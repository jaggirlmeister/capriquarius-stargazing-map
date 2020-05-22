let markersAll = []; //array con todos los markers
let infoWindows = []; //array con todas las infoWindow
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


//Inicializo el mapa (callback en script google api en index.html)
window.initMap = () => {
    const maimo = { lat: -34.610490, lng: -58.440860 }; //esto es maimo!
    const map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 2, //Zoom
            center: maimo, //Centrado de mapa
            styles: styles, //Estilos de mapa, los agrego en index.html mapaStyles.js
            streetViewControl: false, //Desactivo el street view (chaboncito)
            fullscreenControl: false, //Desactivo el boton de fullscreeen
            mapTypeControlOptions: { //Desactivo los tipos de terreno del mapa (satellite y terrain)
                mapTypeIds: []
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER //ubico los controles de zoom
            }
        });
        //Agrego el zoom máximo y mínimo que se pueden hacer
        map.setOptions({ minZoom: 3, maxZoom: 17 });
    fetchMarkers(map) //Llamammos a la función que trae el json de markers

    //FILTROS
    //Traigo elementos del DOM
    const handleFilterPark = document.querySelector('.park');
    const handleFilterObservatory = document.querySelector('.observatory');
    const handleFilterLights = document.querySelector('.lights');
    const handleFilterReserve = document.querySelector('.reserve');
    const handleFilterRecreational = document.querySelector('.recreational');
    const handleResetButton = document.querySelector('.reset');
    // Dropdown
    const countryFilter = document.querySelector('.countriesSelector');
    const sideNav = document.querySelector('.search-box');
    const openSideNav= document.querySelector('#control');
    const defaultSelectorValue = document.querySelector('#default');

    let panelState = true;

    //Eventos de click de los filtros
    handleFilterPark.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('National Park');
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        defaultSelectorValue.selected = true;
    })
    handleFilterObservatory.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Observatory');
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        defaultSelectorValue.selected = true;
    })
    handleFilterLights.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Northern Lights');
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        defaultSelectorValue.selected = true;
    })
    handleFilterReserve.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Nature Reserve');
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        defaultSelectorValue.selected = true;
    })
    handleFilterRecreational.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Recreational Area');
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        defaultSelectorValue.selected = true;
    })
    handleResetButton.addEventListener('click', (e) => {
        e.preventDefault();
        markersAll.forEach(marker=>{
            marker.setMap(map);
        });
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        defaultSelectorValue.selected = true;
    })

    // Filtro para los paises
    countryFilter.addEventListener('change', (e) => {
        e.preventDefault();
        console.log(countryFilter.value);
        addMarkerFilteredByCountry(countryFilter.value);
    })

    // Agrega los markers filtrados por país
    const addMarkerFilteredByCountry = (country) => {
        console.log('clicked beer');
        markersAll.forEach((marker) => {
            //console.log(marker)
            marker.setMap(null); //Quita todos los markers del mapa
        })
        const filterByCountry = markersAll.filter((markerItem) => markerItem.country === country)
        filterByCountry.forEach((marker) => {
            marker.setMap(map);
        })
    }

    //Agrego los markers filtrados según filtro (markerType)
    const addMarkerFiltered = (markerType) => {
        console.log('clicked beer');
        markersAll.forEach((marker) => {
            //console.log(marker)
            marker.setMap(null); //Quita todos los markers del mapa
        })
        const markerFiltered = markersAll.filter((markerItem) => markerItem.customInfo === markerType)
        markerFiltered.forEach((marker) => {
            marker.setMap(map);
        })
    }

    // Abrir y cerrar panel
    openSideNav.addEventListener('click', () => {
        if(panelState == true){
            openSideNav.classList.add('moveSideNav');
            sideNav.classList.add('openSideNav');
            panelState = false;
        }else{
            openSideNav.classList.remove('moveSideNav');
            sideNav.classList.remove('openSideNav');
            panelState = true;
        }
    });


    /*

    const addButton = document.querySelector('.add');

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        addLocation();
    })

    */

    const adminBtn = document.querySelector('#controlAdmin');

    adminBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAdminControl();
    })

    

}

//Función de asincrónica que trae los markers
const fetchMarkers = async (map) => { 
    try {
        const response = await fetch('https://stargazing-map-api-rest.now.sh/locations');
        const json = await response.json();
        json.forEach(marker => {
            addMarker(map, marker);
        });
        //console.log(markersAll)
    } catch (error) {
        console.log(error);
    }
}

//Función de agregado de un marker
const addMarker = (map, marker) => { 
    //Destructuring de la info del marker
    const { lat, lng, name, country, img, link, description, type } = marker;
    var manijin = JSON.stringify(marker);

    //Armo la infowindow
    const contentString = `
    <div class='thisWindowHook'>
        <div class='imgCont'>
            <img src="${img}">
        </div>
        <div class='infoPlace'>
            <h2>${name}</h2>
            <h3>${type}</h3>
            <a href="${link}" target="_blank">Website</a>
            <button id="moreInformation" onclick="locationInfo(${manijin})">Show me more, ami</button>
        </div>
    </div>`;
    
    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    //Agrega la infoWindow al array
    infoWindows.push(infowindow);

    //Iconos
    const icons = {
        'National Park': '/assets/images/park.png',
        'Observatory': '/assets/images/space.png',
        'Northern Lights': '/assets/images/lights.png',
        'Nature Reserve': '/assets/images/nature.png',
        'Recreational Area': '/assets/images/recreational.png',

    }
    //Agrego el marker
    const markerItem = new google.maps.Marker(
        {
            position: { lat: parseFloat(lat), lng: parseFloat(lng) },
            icon: icons[type],
            map: map,
            customInfo: type,
            country: country,
            animation: google.maps.Animation.DROP
        }
    );
    markerItem.setMap(map);

    //Styling map with jQuery
    
    const styleWindow = () =>{ 
        const infoWindowEdit = $('.thisWindowHook').parent().parent().parent();
            infoWindowEdit.css({
                'background-color': '#00002ad1',
                'color' : '#ffffff',
                'padding': '0',
                'margin' : '0',
                'width' : '370px'
            });
            infoWindowEdit.children().css({
                'width' : '100%',
                'overflow' : 'hidden',
                'padding-bottom' : '10px'
            })
        }
    
    
    //Agrego evento de click en el marker, abre infowindow y cierra los demás

    /*
    if(firstClick == false){
        markerItem.addListener("dblclick", function(){
            infoWindows.forEach(infowindow => {
                infowindow.close();
            })
            infowindow.open(map, markerItem);
                styleWindow();
                locationInfo(marker); 
        });
        firstClick = true;
    } else {        
    markerItem.addListener('click', function () {
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        infowindow.open(map, markerItem);
            styleWindow();
            locationInfo(marker);
        });
    } */
    
    infowindow.close();

    /*
    if(cont <= 112){
        
        console.log("cerró")
        cont = cont + 1;
    }
    */
        
    // Botones para abrir y cerrar infowindow
    markerItem.addListener('click', function () {
    
    infoWindows.forEach(infowindow => {
        infowindow.close();
    })
    infowindow.open(map, markerItem);
    /*
        if(firstClick == false){
            infowindow.close();
            firstClick = true;
            console.log(firstClick)
        } */
        styleWindow();
    })
            
    //Agrego mi nuevo marker (objeto marker, no json marker, a mi array para filtros)
    markersAll.push(markerItem);

    const addButton = document.querySelector('.add');

    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        addLocation(marker);
    })

    /*
    const moreInfoBtn = document.querySelector('#moreInformation');
    
    moreInfoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        locationInfo(marker);
    })
    */
    

}

//Función que muestra la información del marker en el panel 
const locationInfo = (marker) =>{
    const { lat, lng, name, country, img, link, description, type } = marker;
    const filters = document.querySelector('#filtersMenu');
    const info = document.querySelector('#locationInfo');

    filters.classList.add('hide');
    info.classList.remove('hide');

    info.innerHTML = `
    <div id="back" class="button backBtn">
        <img id="backBtn" class="arrow" src="assets/images/left-arrow-01.svg">
    </div>
    
    <div class='imgCont'>
        <img src="${img}">
    </div>
    <div class='infoPlace'>
        <h2 id="placeTitle">${name}</h2>
        <div id="filterWeather">
            <h3 id="weatherConditionSub" class="subtitle">Weather condition</h3>
            <div id="selectHour">
                <select id="pickHour" onchange="showData(${lat}, ${lng})">
                    <option value="0" selected>00:00hs</option>
                    <option value="1">03:00hs</option>
                    <option value="2">06:00hs</option>
                    <option value="3">09:00hs</option>
                    <option value="4">12:00hs</option>
                    <option value="5">15:00hs</option>
                    <option value="6">18:00hs</option>
                    <option value="7">21:00hs</option>
                </select>
            </div>
        </div>
        <div id="weatherCondition">

        <div class="loader">
            <div class="loader-inner ball-scale-random">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        </div>
        <h3 class="subtitle" id="desc">Description</h3>
        <p id="placeDescription">${description}</p>
        <a href="${link}" target="_blank" id="placeLink">Website</a>
    </div>`;

    const back = document.querySelector('#back');

    back.addEventListener('click', () => {
        filters.classList.remove('hide');
        info.classList.add('hide');
    });

    showData(lat,lng);
}

// Función que trae los datos de la API openweather
const fetchForecast = async (lat, lng) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Proxy que permite que se pueda hacer el fetch, tira error de CORS sin esto. 
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lng+'&units=metric&appid=0e3498f3359f3fe49fd95d453c4c9a8c';
    const response = await fetch(proxyurl + url);
    const json = await response.json();
    const {list} = json;
    console.log(url);
    return list
}

// Función que muestra los datos de la API openweather
const showData = async (lat, lng) =>{ 
    const weatherData = await fetchForecast(lat, lng);
    const weatherCondition = document.querySelector('#weatherCondition');

    let cloudsAmount = [];
    let transparencySky = [];
    let temperature = [];
    let date = [];
    let time = document.querySelector('#pickHour');
    let timeValue = time.value;
    
    for(i=0;i<8;i++){
        cloudsAmount.push(weatherData[i].clouds.all);
        transparencySky.push(weatherData[i].main.humidity);
        temperature.push(weatherData[i].main.temp.toFixed(1));
        date.push(weatherData[i].dt_txt);
    }

    /*
    for(i=0;i<weatherData.length;i++){
        date.push(weatherData[i].dt_txt);
    } */
    
    console.log(date)

    weatherCondition.innerHTML = `
    <div>
        <p class="weatherValue">${cloudsAmount[timeValue]} %</p>
        <p class="weatherData">Cloud Cover</p>
    </div>
    <div>
        <p class="weatherValue">${transparencySky[timeValue]} %</p>
        <p class="weatherData">Humidity</p>
    </div>
    <div>
        <p class="weatherValue">${temperature[timeValue]} C°</p>
        <p class="weatherData">Temperature</p>
    </div>
    `
}

const addLocation = () => {
    const locationControl = document.querySelector('#locationControl');
    const filters = document.querySelector('#filtersMenu');

    filters.classList.add('hide');
    locationControl.classList.remove('hide');
    
    locationControl.innerHTML = `

    <div id="locationsOptions">
        <div id="back_locationsOptions" class="button backBtn">
            <img id="backBtn" class="arrow" src="assets/images/left-arrow-01.svg">
        </div>
        <h2>Add a location</h2>
        <div class="inputDiv">
            <input type="text" id="latInput" name="" required="">
            <label>Latitude</label>
        </div>
        <div class="inputDiv">
            <input type="text" id="lngInput" name="" required="">
            <label>Longitude</label>
        </div>
        <div class="inputDiv">
            <input type="text" id="nameInput" name="" required="">
            <label>Name</label>
        </div>
        <div class="inputDiv">
            <input type="text" id="countryInput" name="" required="">
            <label>Country</label>
        </div>
        <div class="inputDiv">
            <input type="text" id="websiteInput" name="" required="">
            <label>Website</label>
        </div>
        <div class="inputDiv">
            <input type="text" id="typeInput" name="" required="">
            <label>Type</label>
        </div>
        <div class="inputDiv">
            <textarea type="text" id="descriptionInput" name="" required=""></textarea>
            <label>Description</label>
        </div>
        <input type="submit" value="Submit">
    </div> 
    `

    // EDIT BUTTON 

    const back = document.querySelector("#back_locationsOptions");

    back.addEventListener('click', () => {
        locationControl.classList.add('hide');
        filters.classList.remove('hide');
    });
}


const showAdminControl = () => {
    const map = document.querySelector('#map');
    map.classList.add('blur');
}

const editLocation = (marker) => {
    /*
    const locationControl = document.querySelector('#locationControl');
    const filters = document.querySelector('#filtersMenu');
    const {name} = marker;
    locations.push(name);

    filters.classList.add('hide');
    locationControl.classList.remove('hide');
    
    locationControl.innerHTML = `
    <div id="back" class="button backBtn">
        <img id="backBtn" class="arrow" src="assets/images/left-arrow-01.svg">
    </div>

    <div id="locationList">
    </div>
    `
    const list = document.querySelector('#locationList')

    locations.forEach(name =>{
        list.innerHTML += `<div id="locationItem"><p>${name}</p></div>`
    })
      
    back.addEventListener('click', () => {
        locationControl.classList.add('hide');
        filters.classList.remove('hide');
    });
    */
}




function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });

}
















































































































































/*

<input type="text" id="lng" placeholder="Longitude">
    
    <input type="text" id="name" placeholder="Name">
    <input type="text" id="country" placeholder="Country">
    <input type="file" id="img" placeholder="Picture">
    <input type="url" id="link" placeholder="Website">
    <textarea id="description" cols="10" rows="10" placeholder="Description"></textarea>
    <select id="type">
        <option value="National Park"></option>
        <option value="Observatory"></option>
        <option value="Northern Lights"></option>
        <option value="Nature Reserve"></option>
        <option value="Recreational Area"></option>
    </select>

    <button type="button" id="button">Buscar</button>

/*

const fetchForecast = async (lng, lat) => {
    const response = await fetch('http://www.7timer.info/bin/astro.php?lon='+lng+'&lat='+lat+'&ac=0&unit=metric&output=json&tzshift=0');
    const json = await response.json();
    const {dataseries} = json;
    return dataseries;
}

const showData = async (lat, lng) =>{
    const weatherData = await fetchForecast(lat, lng);

    const cloudAmount = weatherData.map(({cloudcover}) => cloudcover);
    const transparencySky = weatherData.map(({transparency}) => transparency);
    const seeingSky = weatherData.map(({seeing}) => seeing);

    console.log(cloudAmount)
    console.log(transparencySky)
    console.log(seeingSky)

    const weatherCondition = document.querySelector('#weatherCondition');

    weatherCondition.innerHTML = `
    <div>
        <p class="weatherData">${cloudAmount[0]}</p>
        <p class="weatherData">Cloud Cover</p>
    </div>
    <div>
        <p class="weatherData">${transparencySky[0]}</p>
        <p class="weatherData">Transparency</p>
    </div>
    <div>
        <p class="weatherData">${seeingSky[0]}</p>
        <p class="weatherData">Seeing</p>
    </div>
    `
}

*/
        
//jQuery for dropdown
        
//search-box
    /*
    $('#myDropdown').ddslick({
        data:ddData,
        width:300,
        selectText: "Select your preferred social network",
        imagePosition:"right",
        onSelected: function(selectedData){
            //callback function: do something with selectedData;
        }   
    });
    */
        
//That's all folks!