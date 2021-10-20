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


function init() {
    console.log('DOM Geladen');
    dropdownContent();
}

document.addEventListener('DOMContentLoaded', init);
