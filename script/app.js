'use strict';


var dropdown = document.getElementsByClassName("dropdown-Country");
var i;
let myCountries = ['Belgium', 'France', 'Netherlands', 'Germany'];
let menubtn;
let sidebar;
let maincontent;
let cancelMenu;
let sidebarcontent;
let sidebarbg;
let logo;

function displayNone(){
    cancelMenu.style.display = 'none'
    sidebar.style.display = 'none'
}

function displayNone1(){
    menubtn.style.display = 'none'
}

function ListenToClickMenu(btn) {
    btn.addEventListener('click', function () {
        maincontent = document.querySelector('.ride')
        if (sidebar.style.display == 'block') {
            maincontent.style.opacity = '100%'
            menubtn.style.animation = 'fadein 0.3s'
            cancelMenu.style.animation = 'fadeout 0.3s'
            menubtn.style.display = 'block'
            setTimeout(displayNone,300)
            sidebarcontent.style.animation = 'slideout 0.3s'
            sidebarbg.style.animation = 'slideout 0.3s'
            
        } else {
            sidebar.style.display = 'block'
            maincontent.style.opacity = '30%'
            menubtn.style.animation = 'fadeout 0.3s'
            cancelMenu.style.animation = 'fadein 0.3s'
            cancelMenu.style.display = 'block'
            setTimeout(displayNone1,300)
            sidebarcontent.style.animation = 'slidein 0.3s'
            sidebarbg.style.animation = 'slidein 0.3s'
        }
    })
}

function dropdownContent() {
    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                console.log('Animatie inklappen')
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
                dropdownContent.style.animation = "fadein 0.5s";
                console.log('Animatie uitlappen')
            }
        });
    }
    cancelMenu = document.querySelector('.cancel-menu__symbol')
    sidebar = document.querySelector('.sidenavigation')
    sidebarcontent = document.querySelector('.sidenav')
    sidebarbg = document.querySelector('.bg-sidenav')
    menubtn = document.querySelector('.menu__symbol')

    if (menubtn) {
        ListenToClickMenu(menubtn);
    }

    if (!menubtn) {
        ListenToClickMenu(menubtn);
    }
    if(cancelMenu){
        ListenToClickMenu(cancelMenu);
    }
}

function fillData(data) {
    console.log("data", data)
    console.log("lenge data", data.length)
    let htmlsidenavcountry = document.querySelector('.sidenav')
    htmlsidenavcountry.innerHTML = ``
    let sidenavcountrystring = `<Header>Parks</Header>`
    for (let i = 0; i < myCountries.length; i++) {
        let country = myCountries[i]
        if (country == 'Netherlands') {
            country = 'The Netherlands'
        }
        sidenavcountrystring += `<button class="dropdown-Country">${country}
        <i class="fa fa-caret-down">&#9660</i>
      </button>`;
        if (country == 'The Netherlands') {
            country = 'Netherlands'
        }
        sidenavcountrystring += `<div class="dropdown-container">`;
        for (let j = 0; j < data.length; j++) {
            let parkobj = data[j]
            if (parkobj.country == country) {
                sidenavcountrystring += `<a class="c-park" href="#">${
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
    // const ENDPOINT = `https://cors-anywhere.herokuapp.com/https://queue-times.com/nl/parks.json`;
    const ENDPOINT = `https://queue-times.com/nl/parks.json`;

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
