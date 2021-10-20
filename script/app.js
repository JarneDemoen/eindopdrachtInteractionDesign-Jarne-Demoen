'use strict';


var dropdown = document.getElementsByClassName("dropdown-Country");
var i;

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

function filterDataEurope(jsonObject) {
    console.log(jsonObject)
}

let getData = async () => {
    const ENDPOINT = `https://queue-times.com/nl/parks.json`;

    // Met de fetch API proberen we de data op te halen.
    const request = await fetch(`${ENDPOINT}`);
    const data = await request.json();
    console.log("getAPI data", data);
}

function init() {
    console.log('DOM Geladen');
    dropdownContent();
    getData();
}

document.addEventListener('DOMContentLoaded', init);
