'use strict';


var dropdown = document.getElementsByClassName("dropdown-Country");
var i;
let myCountries = ['Belgium', 'France', 'Netherlands', 'Germany'];

function dropdownContent() {
    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
}

function fillData(data) {
    console.log("data", data)
    console.log("lenge data", data.length)
    let htmlsidenavcountry = document.querySelector('.sidenav')
    htmlsidenavcountry.innerHTML = ``
    let sidenavcountrystring = ``
    for (let i = 0; i < myCountries.length; i++) {
        let country = myCountries[i]
        sidenavcountrystring += `<button class="dropdown-Country">${country}
        <i class="fa fa-caret-down">&#9660</i>
      </button>`;
        sidenavcountrystring += `<div class="dropdown-container">`;
        for (let j = 0; j < data.length; j++) {
            let parkobj = data[j]
            if (parkobj.country == country) {
                sidenavcountrystring += `<a href="#">${
                    parkobj.name
                }</a>`
            }
        }
        sidenavcountrystring += '</div>';
    }
    htmlsidenavcountry.innerHTML = sidenavcountrystring;
    dropdownContent();
}

function filterDataEurope(jsonObject) {
    let filteredDataArray = []
    for (let i = 0; i < jsonObject.length; i++) {
        for (let j = 0; j < jsonObject[i].parks.length; j++) {
            for (let index in myCountries) {
                if (myCountries[index] == jsonObject[i].parks[j].country) { // console.log(jsonObject[i].parks[j].name);
                    let park = jsonObject[i].parks[j]
                    filteredDataArray.push(park)
                }
            }
            // console.log(jsonObject[i].parks[j].name) alle parken
        }
    }
    // console.log(filteredDataArray);
    fillData(filteredDataArray);
}

let getData = async () => { 
    const ENDPOINT = `https://cors-anywhere.herokuapp.com/https://queue-times.com/nl/parks.json`;
    // const ENDPOINT = `https://queue-times.com/nl/parks.json`;

    // Met de fetch API proberen we de data op te halen.
    const request = await fetch(`${ENDPOINT}`, {dataType: 'jsonp'});
    const data = await request.json();
    filterDataEurope(data)
}

function init() {
    console.log('DOM Geladen');
    getData();
}

document.addEventListener('DOMContentLoaded', init);
