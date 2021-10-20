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
    for (let i = 0; i < myCountries.length; i++) {
        let country = myCountries[i]
        console.log('Vullen van land: ', country)
        htmlsidenavcountry.innerHTML += `<button class="dropdown-Country">${country}
        <i class="fa fa-caret-down">&#9660</i>
      </button><div class="dropdown-container">`
        console.log('innerhtml', htmlsidenavcountry.innerHTML)
        for (let j = 0; j < data.length; j++) {
            let parkobj = data[j]
            console.log('Wordt onderzocht: ', parkobj)
            console.log('innerhtml', htmlsidenavcountry.innerHTML)
            if (parkobj.country == country) {
                htmlsidenavcountry.innerHTML += `<a href="#">${
                    parkobj.name
                }</a>`
                console.log('Hoort bij land')
                console.log('innerhtml', htmlsidenavcountry.innerHTML)
            }
            console.log('innerhtml', htmlsidenavcountry.innerHTML)
        }
        htmlsidenavcountry.innerHTML += '</div>';
        console.log('innerhtml', htmlsidenavcountry.innerHTML)
    }
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

let getData = async () => { // const ENDPOINT = `https://cors-anywhere.herokuapp.com/https://queue-times.com/nl/parks.json`;
    const ENDPOINT = `https://queue-times.com/nl/parks.json`;

    // Met de fetch API proberen we de data op te halen.
    const request = await fetch(`${ENDPOINT}`, {dataType: 'jsonp'});
    const data = await request.json();
    filterDataEurope(data)
}

function init() {
    console.log('DOM Geladen');
    dropdownContent();
    getData();
}

document.addEventListener('DOMContentLoaded', init);
