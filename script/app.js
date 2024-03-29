'use strict';


var dropdown = document.getElementsByClassName("dropdown-Country");
var i;
var mediaQuery = window.matchMedia("(max-width: 570px)")
let myCountries = ['Belgium', 'France', 'Netherlands', 'Germany'];
let menubtn;
let sidebar;
let maincontent;
let cancelMenu;
let sidebarcontent;
let sidebarbg;
let logo;
let content;
let favoritebtn;
let toggle_nav = true;
let listRideID = [];
let arrayLiked = [];
let parkdata;
let navcanopen = false;

function HideWaitTime(status) {
    if (status == false || status == 'false') {
        return 'opacity0'
    } else {
        return ''
    }
}

function fillContentWithFavorites() {
    let favoriteString = `<h1 class="parkname">Favorites</h1>`
    if (arrayLiked.length == 0) {
        favoriteString += '<div class="message">You have no favorite rides yet !</div>'
    }
    for (let ride of arrayLiked) {
        console.log(ride)
        if (ride.name == 'Mr. Frog') {
            ride.name = 'Mr Frog'
        }
        if (ride.name == 'Cécémel Ice Rink') {
            ride.name = 'Cecemel Ice Rink'
        }
        if (ride.name == 'Mission Vulcania : Opération sauvetage') {
            ride.name = 'Mission Vulcania'
        }
        if (ride.name == 'Xpress: Platform 13') {
            ride.name = 'Xpress'
        }
        let imgSource = `/eindopdrachtInteractionDesign-Jarne-Demoen/img/${
            modifyName(ride.parkname)
        }/${
            modifyName(ride.name)
        }.jpg`
        favoriteString += `<div class="ride">
        <div class="rideimage">
            <img src=${imgSource} alt="">
        </div>
        <div class="rideinfo">
            <p class="ridename ${
            longNameChecker(ride.name)
        }">${
            ride.name
        }</p>`
        if (ride.status == 'true') {
            favoriteString += `<p class="ridestatus">Open</p>`
        } else {
            favoriteString += `<p class="ridestatus">Closed</p>`
        } favoriteString += `
            <div class="ridewait ${
            HideWaitTime(ride.status)
        }">
                <span class="icon">
                    <svg class="time-svg" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 408.76 409.6">
                        <g>
                            <path d="M272.22,78.93h24a22,22,0,0,0,3.08.66c32,2.26,61.88,11.42,89.18,28.18,52.95,32.52,85.54,79.39,97,140.72,1.43,7.68,2.14,15.49,3.18,23.24v24c-.33,2.88-.66,5.75-1,8.63-4.89,44.07-21.69,82.95-51.34,115.91-31.47,35-70.47,56.85-116.87,65.07-7.69,1.37-15.49,2.14-23.23,3.19h-24c-1.29-.24-2.58-.53-3.88-.72-8.93-1.29-18-2-26.78-3.93-48.93-10.65-88.89-35.94-119.36-75.66-32.81-42.77-46.45-91.46-41.3-145,4.15-43.27,20.89-81.5,49.61-114.16C162.2,113,201.71,90.55,249,82.12,256.68,80.74,264.47,80,272.22,78.93ZM456.85,283.8c.09-95.36-77.12-172.84-172.48-173.06-95.06-.22-172.47,77.14-172.82,172.72-.36,95.32,77.36,173.3,172.68,173.26S456.76,379.29,456.85,283.8Z" transform="translate(-79.84 -78.93)"/>
                            <path d="M268.3,237.33c0-15.46-.09-30.92,0-46.39.1-12.15,10.59-19.89,21.34-16,6.68,2.45,10.41,8.37,10.42,16.77,0,26.8.07,53.59-.07,80.39,0,3.51.92,5.75,3.85,7.91q26.34,19.44,52.37,39.3c7.89,6,9.37,15.64,3.8,22.86s-15,8.26-22.71,2.5c-14.64-10.87-29.17-21.88-43.75-32.83-5.64-4.24-11.17-8.64-16.94-12.68s-8.44-9.57-8.38-16.67C268.39,267.46,268.3,252.4,268.3,237.33Z" transform="translate(-79.84 -78.93)"/>
                        </g>
                    </svg>
                </span>
                <span class="icontext ${
            color_wait_time(ride.wait)
        }">${
            ride.wait
        } min</span>
            </div>
            <div class="like" name="${
            ride.name
        }" pretparkname="${
            ride.parkname
        }" ridestatus="${
            ride.status
        }" wait="${
            ride.wait
        }" id="${
            ride.id
        }"">
        <svg class="like__symbol liked" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 409.05 364.51">
                                <g>
                                    <path fill="red" d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                    <path fill="red" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                </g>
                            </svg>
    
                    </div>
        </div>
    </div>`
    }
    content.innerHTML = favoriteString
    ListenToLike();
}

function ListenToClickFavorites() {
    favoritebtn.addEventListener('click', function () {
        console.log('Toon favorieten')
        closeNav()
        fillContentWithFavorites()
    })
}

function ListenToLike() {
    console.log('ListenToLike')
    const likebuttons = document.querySelectorAll('.like__symbol')
    for (let likebtn of likebuttons) {
        likebtn.addEventListener('click', function () {
            if (likebtn.classList.contains('liked')) {
                console.log('UnLike!')
                likebtn.style.animation = ''
                likebtn.innerHTML = `<g>
            <path d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
            <path fill="white" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
        </g>`
                likebtn.classList.remove('liked');
                let parent = likebtn.parentNode;
                console.log(parent)
                let name = parent.getAttribute('name')
                let parkname = parent.getAttribute('pretparkname')
                let status = parent.getAttribute('ridestatus')
                let wait = parent.getAttribute('wait')
                let id = parent.getAttribute('id')
                console.log(name, parkname, status, wait)
                let addArray = {
                    'name': name,
                    'parkname': parkname,
                    'status': status,
                    'wait': wait,
                    'id': id
                }
                console.log('Deze verwijderen', addArray)
                /*Verwijderen van een specifiek element in een array*/
                for (let favo of arrayLiked) {
                    if (favo.name == name && favo.parkname == parkname) {
                        let index = arrayLiked.indexOf(favo)
                        arrayLiked.splice(index, 1)
                    }
                }
                for (let favo of listRideID) {
                    if (favo == id) {
                        let index = listRideID.indexOf(favo)
                        listRideID.splice(index, 1)
                    }
                }
                console.log('gelikete attracties: ', arrayLiked)
                console.log('listrideid', listRideID)
                return
            } else {
                console.log('Like!')
                likebtn.classList.add('liked')
                let parent = likebtn.parentNode;
                console.log(parent)
                let name = parent.getAttribute('name')
                let parkname = parent.getAttribute('pretparkname')
                let status = parent.getAttribute('ridestatus')
                let wait = parent.getAttribute('wait')
                let id = parent.getAttribute('id')
                console.log(name, parkname, status, wait, id)
                let addArray = {
                    'name': name,
                    'parkname': parkname,
                    'status': status,
                    'wait': wait,
                    'id': id
                }
                console.log(addArray)

                arrayLiked.push(addArray)
                listRideID.push(parseInt(id))
                likebtn.style.animation = 'fadein 0.5s'
                console.log(likebtn)
                likebtn.innerHTML = `<g>
            <path fill="red" d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
            <path fill="red" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
        </g>`
                console.log('gelikete attracties: ', arrayLiked)
                console.log('listrideid', listRideID)
            }
        })
    }
}

function longNameChecker(name) {
    if (name.length >= 20) {
        return 'longname'
    }
    return 'normalname'
}

function closeNav() {
    if (sidebar.style.display == 'block') {
        content.style.opacity = '100%'
        menubtn.style.animation = 'fadein 0.3s'
        cancelMenu.style.animation = 'fadeout 0.3s'
        menubtn.style.display = 'block'
        setTimeout(displayNone, 300)
        sidebarcontent.style.animation = 'slideout 0.3s'
        sidebarbg.style.animation = 'slideout 0.3s'
        console.log('Klapt dicht')
        toggle_nav = false

    } else {
        if (navcanopen) {
            sidebar.style.display = 'block'
            content.style.opacity = '30%'
            menubtn.style.animation = 'fadeout 0.3s'
            cancelMenu.style.animation = 'fadein 0.3s'
            cancelMenu.style.display = 'block'
            setTimeout(displayNone1, 300)
            sidebarcontent.style.animation = 'slidein 0.3s'
            sidebarbg.style.animation = 'slidein 0.3s'
            console.log('Klapt open')
            toggle_nav = true
        }

    }
}

function ListenToClickTapContent(tabplace) {
    tabplace.addEventListener('click', function () {
        if (mediaQuery.matches && toggle_nav) {
            console.log('Navigatie zal moeten sluiten')
            closeNav();
        }
    })
}

function color_wait_time(wait_time) {
    if (wait_time <= 15) {
        return 'short'
    }
    if (wait_time > 15 && wait_time <= 45) {
        return 'normal'
    }
    if (wait_time > 45) {
        return 'long'
    }
}

function modifyName(name) {
    let new_name = "";
    for (let char of name) {
        if (char == ' ') {
            char = '_'
        }
        new_name += char
    }
    return new_name
}

function fillContentPage(jsonObject, pretparkname) {
    console.log('listRideID', listRideID)
    let contentString = `<h1 class="parkname">${pretparkname}</h1>`;
    if (jsonObject.lands.length > 0) {
        parkdata = []
        console.log('jsonobject bij landen', jsonObject)
        for (let land of jsonObject.lands) {
            for (let ride of land.rides) {
                parkdata.push(ride)
            }
        }
        for (let ride of jsonObject.rides) {
            if (pretparkname != 'Heide Park ') {
                parkdata.push(ride)
            }
        }
        console.log('parkdata', parkdata)
        for (let attractie of parkdata) {
            if (attractie.name == 'Disney Princesses: A Royal Invitation') {
                attractie.name = 'Disney Princesses'
            }
            if (attractie.name == 'Armageddon : les Effets Spéciaux') {
                attractie.name = 'Armageddon'
            }
            if (attractie.name == 'Ratatouille: The Adventure') {
                attractie.name = 'Ratatouille'
            }
            if (attractie.name == 'Ratatouille: The Adventure Single Rider') {
                attractie.name = 'Ratatouille Single Rider'
            }
            if (attractie.name == 'Alpine Coaster "Enzian"') {
                attractie.name = 'Alpine Coaster'
            }
            if (attractie.name == 'VirtualLine: Eurosat - CanCan Coaster') {
                attractie.name = 'VirtualLine - Eurosat - CanCan Coaster'
            }
            if (attractie.name == 'VirtualLine: blue fire Megacoaster powered by Nord Stream 2') {
                attractie.name = 'VirtualLine - blue fire Megacoaster'
            }
            if (attractie.name == 'VirtualLine: WODAN - Timburcoaster') {
                attractie.name = 'VirtualLine - WODAN - Timburcoaster'
            }
            if (attractie.name == 'VirtualLine: Arthur') {
                attractie.name = 'VirtualLine - Arthur'
            }
            if (attractie.name == 'VirtualLine: Pirates in Batavia') {
                attractie.name = 'VirtualLine - Pirates in Batavia'
            }
            if (attractie.name == 'VirtualLine: Pirates in Batavia') {
                attractie.name = 'VirtualLine - Pirates in Batavia'
            }
            if (attractie.name == 'VirtualLine: Euro-Mir') {
                attractie.name = 'VirtualLine - Euro-Mir'
            }
            let imgSource = `/eindopdrachtInteractionDesign-Jarne-Demoen/img/${
                modifyName(pretparkname)
            }/${
                modifyName(attractie.name)
            }.jpg`
            contentString += `<div class="ride">
            <div class="rideimage">
                <img src=${imgSource} alt="">
            </div>
            <div class="rideinfo">
                <p class="ridename ${
                longNameChecker(attractie.name)
            }">${
                attractie.name
            }</p>`
            if (attractie.is_open == true) {
                contentString += `<p class="ridestatus">Open</p>`
            } else {
                contentString += `<p class="ridestatus">Closed</p>`
            } contentString += `
                <div class="ridewait ${
                HideWaitTime(attractie.is_open)
            }">
                    <span class="icon">
                        <svg class="time-svg" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 408.76 409.6">
                            <g>
                                <path d="M272.22,78.93h24a22,22,0,0,0,3.08.66c32,2.26,61.88,11.42,89.18,28.18,52.95,32.52,85.54,79.39,97,140.72,1.43,7.68,2.14,15.49,3.18,23.24v24c-.33,2.88-.66,5.75-1,8.63-4.89,44.07-21.69,82.95-51.34,115.91-31.47,35-70.47,56.85-116.87,65.07-7.69,1.37-15.49,2.14-23.23,3.19h-24c-1.29-.24-2.58-.53-3.88-.72-8.93-1.29-18-2-26.78-3.93-48.93-10.65-88.89-35.94-119.36-75.66-32.81-42.77-46.45-91.46-41.3-145,4.15-43.27,20.89-81.5,49.61-114.16C162.2,113,201.71,90.55,249,82.12,256.68,80.74,264.47,80,272.22,78.93ZM456.85,283.8c.09-95.36-77.12-172.84-172.48-173.06-95.06-.22-172.47,77.14-172.82,172.72-.36,95.32,77.36,173.3,172.68,173.26S456.76,379.29,456.85,283.8Z" transform="translate(-79.84 -78.93)"/>
                                <path d="M268.3,237.33c0-15.46-.09-30.92,0-46.39.1-12.15,10.59-19.89,21.34-16,6.68,2.45,10.41,8.37,10.42,16.77,0,26.8.07,53.59-.07,80.39,0,3.51.92,5.75,3.85,7.91q26.34,19.44,52.37,39.3c7.89,6,9.37,15.64,3.8,22.86s-15,8.26-22.71,2.5c-14.64-10.87-29.17-21.88-43.75-32.83-5.64-4.24-11.17-8.64-16.94-12.68s-8.44-9.57-8.38-16.67C268.39,267.46,268.3,252.4,268.3,237.33Z" transform="translate(-79.84 -78.93)"/>
                            </g>
                        </svg>
                    </span>
                    <span class="icontext ${
                color_wait_time(attractie.wait_time)
            }">${
                attractie.wait_time
            } min</span>
                </div>
                <div class="like" name="${
                attractie.name
            }" pretparkname="${pretparkname}" ridestatus="${
                attractie.is_open
            }" wait="${
                attractie.wait_time
            }" id="${
                attractie.id
            }">`;
            if (listRideID.length != 0) {
                console.log('lijst: ', listRideID, 'attractieid', attractie.id)
                if (listRideID.includes(attractie.id)) {
                    contentString += `<svg class="like__symbol liked" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 409.05 364.51">
                    <g>
                        <path fill="red" d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                        <path fill="red" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                    </g>
                </svg>

</div>
</div>
</div>`
                } else {
                    contentString += `<svg class="like__symbol" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 409.05 364.51">
                                <g>
                                    <path d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                    <path fill="white" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                </g>
                            </svg>

            </div>
            </div>
        </div>`
                }
            } else {
                contentString += `<svg class="like__symbol" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 409.05 364.51">
                                <g>
                                    <path d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                    <path fill="white" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                </g>
                            </svg>

            </div>
            </div>
        </div>`
            }

        }
        console.log('listRideID', listRideID)
        content.innerHTML = contentString
    }
    if (jsonObject.rides.length == 0) {
        console.log('Er zijn geen rides')
    }
    if (jsonObject.lands.length == 0) {
        console.log('Er zijn geen gebieden')
        for (let attractie of jsonObject.rides) {
            if (attractie.name == 'Mr. Frog') {
                attractie.name = 'Mr Frog'
            }
            if (attractie.name == 'Cécémel Ice Rink') {
                attractie.name = 'Cecemel Ice Rink'
            }
            if (attractie.name == 'Mission Vulcania : Opération sauvetage') {
                attractie.name = 'Mission Vulcania'
            }
            if (attractie.name == 'Xpress: Platform 13') {
                attractie.name = 'Xpress'
            }
            let imgSource = `/eindopdrachtInteractionDesign-Jarne-Demoen/img/${
                modifyName(pretparkname)
            }/${
                modifyName(attractie.name)
            }.jpg`
            contentString += `<div class="ride">
            <div class="rideimage">
                <img src=${imgSource} alt="">
            </div>
            <div class="rideinfo">
                <p class="ridename ${
                longNameChecker(attractie.name)
            }">${
                attractie.name
            }</p>`
            if (attractie.is_open == true) {
                contentString += `<p class="ridestatus">Open</p>`
            } else {
                contentString += `<p class="ridestatus">Closed</p>`
            } contentString += `
                <div class="ridewait ${
                HideWaitTime(attractie.is_open)
            }">
                    <span class="icon">
                        <svg class="time-svg" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 408.76 409.6">
                            <g>
                                <path d="M272.22,78.93h24a22,22,0,0,0,3.08.66c32,2.26,61.88,11.42,89.18,28.18,52.95,32.52,85.54,79.39,97,140.72,1.43,7.68,2.14,15.49,3.18,23.24v24c-.33,2.88-.66,5.75-1,8.63-4.89,44.07-21.69,82.95-51.34,115.91-31.47,35-70.47,56.85-116.87,65.07-7.69,1.37-15.49,2.14-23.23,3.19h-24c-1.29-.24-2.58-.53-3.88-.72-8.93-1.29-18-2-26.78-3.93-48.93-10.65-88.89-35.94-119.36-75.66-32.81-42.77-46.45-91.46-41.3-145,4.15-43.27,20.89-81.5,49.61-114.16C162.2,113,201.71,90.55,249,82.12,256.68,80.74,264.47,80,272.22,78.93ZM456.85,283.8c.09-95.36-77.12-172.84-172.48-173.06-95.06-.22-172.47,77.14-172.82,172.72-.36,95.32,77.36,173.3,172.68,173.26S456.76,379.29,456.85,283.8Z" transform="translate(-79.84 -78.93)"/>
                                <path d="M268.3,237.33c0-15.46-.09-30.92,0-46.39.1-12.15,10.59-19.89,21.34-16,6.68,2.45,10.41,8.37,10.42,16.77,0,26.8.07,53.59-.07,80.39,0,3.51.92,5.75,3.85,7.91q26.34,19.44,52.37,39.3c7.89,6,9.37,15.64,3.8,22.86s-15,8.26-22.71,2.5c-14.64-10.87-29.17-21.88-43.75-32.83-5.64-4.24-11.17-8.64-16.94-12.68s-8.44-9.57-8.38-16.67C268.39,267.46,268.3,252.4,268.3,237.33Z" transform="translate(-79.84 -78.93)"/>
                            </g>
                        </svg>
                    </span>
                    <span class="icontext ${
                color_wait_time(attractie.wait_time)
            }">${
                attractie.wait_time
            } min</span>
                </div>
                <div class="like" name="${
                attractie.name
            }" pretparkname="${pretparkname}" ridestatus="${
                attractie.is_open
            }" wait="${
                attractie.wait_time
            }" id="${
                attractie.id
            }">`;
            if (listRideID.length != 0) {
                console.log('lijst: ', listRideID, 'attractieid', attractie.id)
                if (listRideID.includes(attractie.id)) {
                    contentString += `<svg class="like__symbol liked" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 409.05 364.51">
                    <g>
                        <path fill="red" d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                        <path fill="red" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                    </g>
                </svg>

</div>
</div>
</div>`
                } else {
                    contentString += `<svg class="like__symbol" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 409.05 364.51">
                                <g>
                                    <path d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                    <path fill="white" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                </g>
                            </svg>

            </div>
            </div>
        </div>`
                }
            } else {
                contentString += `<svg class="like__symbol" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 409.05 364.51">
                                <g>
                                    <path d="M488.6,233.33c-1.41,8-2.4,16-4.31,23.91-5.05,20.77-15.19,39.13-27.85,56.13-19.54,26.23-43.3,48.4-67.82,69.77q-43.37,37.8-87,75.26c-11.15,9.61-23.14,10-33.89.69-37.79-32.83-75.68-65.57-113-98.92-19.2-17.14-36.44-36.25-50.5-58-25.2-39-32-80.79-16.06-124.72,14.44-39.72,42.47-65.71,84.57-73.84,43.63-8.44,78.77,7.22,106.68,40.89,1.35,1.64,2.62,3.36,3.94,5a8.31,8.31,0,0,0,1.05.88c1.51-1.94,3-3.9,4.55-5.8,16.17-19.84,35.9-34.37,61.13-40.36,44-10.43,90.69,8,116.09,45.4,12.54,18.48,19.49,38.89,21.73,61,.15,1.43.48,2.84.72,4.26ZM284.16,441.69c1.94-1.64,3.66-3.09,5.36-4.55q24.53-21.09,49.05-42.2c27.42-23.65,55.23-46.89,79.95-73.49,14.36-15.47,27.6-31.85,36-51.45,15.91-37.06,14-73.17-8.44-107-28.29-42.63-93.13-53.75-132.75-9.72-5.67,6.3-10.5,13.39-15.49,20.27-2.66,3.68-5.54,6.79-10.13,7.84-7,1.59-12.69-.92-17.14-7.93a131.12,131.12,0,0,0-23.56-28c-34.93-31.11-89.08-25.14-117.8,8.86-29,34.38-32.56,73.48-15.82,114.59,8.2,20.13,21.4,37.25,36.62,52.42,19.41,19.35,39.49,38.07,59.93,56.32C234.19,399.31,259.12,420.15,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                    <path fill="white" d="M284.16,441.69c-25-21.54-50-42.38-74.2-64-20.44-18.25-40.52-37-59.93-56.32-15.22-15.17-28.42-32.29-36.62-52.42-16.74-41.11-13.22-80.21,15.82-114.59,28.72-34,82.87-40,117.8-8.86a131.12,131.12,0,0,1,23.56,28c4.45,7,10.19,9.52,17.14,7.93,4.59-1.05,7.47-4.16,10.13-7.84,5-6.88,9.82-14,15.49-20.27,39.62-44,104.46-32.91,132.75,9.72,22.43,33.79,24.35,69.9,8.44,107-8.42,19.6-21.66,36-36,51.45-24.72,26.6-52.53,49.84-79.95,73.49q-24.49,21.13-49.05,42.2C287.82,438.6,286.1,440.05,284.16,441.69Z" transform="translate(-79.55 -101.35)"/>
                                </g>
                            </svg>

            </div>
            </div>
        </div>`
            }

        }
        console.log('listRideID', listRideID)
        content.innerHTML = contentString
    }
    ListenToLike();
}

let getDataAttracties = async (pretparkId, pretparkname) => {
    const ENDPOINT = `https://cors.guillaume.cloud/https://queue-times.com/nl/parks/${pretparkId}/queue_times.json`;
    // const ENDPOINT = `https://queue-times.com/nl/parks/${pretparkId}/queue_times.json`;

    // Met de fetch API proberen we de data op te halen.
    const request = await fetch(`${ENDPOINT}`, {
        headers: {
            'origin': '*'
        },
        dataType: 'jsonp'
    });
    const data = await request.json();
    console.log('Data: ', data)
    fillContentPage(data, pretparkname);
}

function ListenToClickPretpark() {
    const pretparken = document.querySelectorAll('.c-park')
    for (let pretparkbtn of pretparken) {
        pretparkbtn.addEventListener('click', function () {
            let pretparkId = pretparkbtn.getAttribute('parkid')
            let pretparkname = pretparkbtn.innerHTML;
            console.log('Gekozen pretpark is: ', pretparkId)
            closeNav()
            getDataAttracties(pretparkId, pretparkname)
        })
    }
}

function displayNone() {
    cancelMenu.style.display = 'none'
    sidebar.style.display = 'none'
}

function displayNone1() {
    menubtn.style.display = 'none'
}

function ListenToClickMenu(btn) {
    btn.addEventListener('click', function () {
        navcanopen = true;
        closeNav();
    })
    if (btn == cancelMenu) {
        ListenToClickTapContent(content)
    }
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
                dropdownContent.style.animation = "fadein 0.6s";
                console.log('Animatie uitlappen')
            }
        });
    }
    cancelMenu = document.querySelector('.cancel-menu__symbol')
    sidebar = document.querySelector('.sidenavigation')
    sidebarcontent = document.querySelector('.sidenav')
    sidebarbg = document.querySelector('.bg-sidenav')
    menubtn = document.querySelector('.menu__symbol')
    favoritebtn = document.querySelector('.favorites')

    if (menubtn) {
        ListenToClickMenu(menubtn);
    }

    if (cancelMenu) {
        ListenToClickMenu(cancelMenu);
    }
    ListenToClickPretpark();
    ListenToClickFavorites();
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
                sidenavcountrystring += `<a class="c-park" parkid=${
                    parkobj.id
                } href="#">${
                    parkobj.name
                }</a>`
            }
        }
        sidenavcountrystring += '</div>';
    }
    sidenavcountrystring += `<button class="favorites">Favorites</button>`;
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

let getDataPretparken = async () => {
    const ENDPOINT = `https://cors.guillaume.cloud/https://queue-times.com/nl/parks.json`;
    // const ENDPOINT = `https://queue-times.com/nl/parks.json`;
    // Met de fetch API proberen we de data op te halen.
    const request = await fetch(`${ENDPOINT}`, {
        headers: {
            'origin': '*'
        },
        dataType: 'jsonp'
    });
    const data = await request.json();
    console.log('Ophalen gelukt')
    filterDataEurope(data)
}

function init() {
    console.log('DOM Geladen');
    getDataPretparken();
    content = document.querySelector('.content')
    getDataAttracties(276, 'Bellewaerde')
}

document.addEventListener('DOMContentLoaded', init);
