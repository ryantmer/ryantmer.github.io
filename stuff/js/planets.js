function setOrbits() {
    var mercury = document.querySelector('#mercury');
    mercury.style.setProperty('-webkit-animation-duration', '10s');
    var earth = document.querySelector('#earth');
    earth.style.setProperty('-webkit-animation-duration', '1s');
}

window.onload = setOrbits;