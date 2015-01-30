var periodFactor = 1e6;
var diameterFactor = 1e3;
var sunDiameterFactor = 100e3; //Sun has its own scaling factor, due to its size
var orbitFactor = 1e6;
var G = 6.67384e-11;

//Diameter, orbit in km; period in seconds
var sun = {};
sun.name = "sun";
sun.diameter = 695800*2;
sun.colour = "yellow";
sun.mass = 1.989e30;
var allPlanets = {};
var mercury = {};
mercury.name = "Mercury";
mercury.diameter = 2440*2;
mercury.colour = "brown";
mercury.period = 7603200;
mercury.orbit = 58000000*2;
allPlanets.Mercury = mercury;
var venus = {};
venus.name = "Venus";
venus.diameter = 6052*2;
venus.colour = "darkolivegreen";
venus.period = 19414080;
venus.orbit = 108000000*2;
allPlanets.Venus = venus;
// var earth = {};
// earth.name = "Earth";
// earth.diameter = 6371*2;
// earth.colour = "powderblue";
// earth.period = 31557600;
// earth.orbit = 150000000*2;
// allPlanets.Earth = earth;
// var mars = {};
// mars.name = "Mars";
// mars.diameter = 3390*2;
// mars.colour = "red";
// mars.period = 59356800;
// mars.orbit = 228000000*2;
// allPlanets.Mars = mars;

function showHideSettings(checkbox) {
    if (checkbox.checked) {
        var settings = document.getElementById("settings");
        settings.style.setProperty("display", "none");
    } else {
        var settings = document.getElementById("settings");
        settings.style.setProperty("display", "inline");
    }
}

function showHideOrbits(checkbox) {
    var orbits = document.getElementsByClassName("orbit");
    for (var i = 0; i < orbits.length; ++i) {
        if (checkbox.checked) {
            orbits[i].style.setProperty("border-width", "1px");
        } else {
            orbits[i].style.setProperty("border-width", "0px");
        }
    }
}

function updateDiameter(event) {
    console.log("Updating diameter for " + event.target.id.replace("-diameter-input", ""));
    var planet = allPlanets[event.target.id.replace("-diameter-input", "")],
        planetDiv = document.getElementById(planet.name),
        newDiameter = event.target.value / diameterFactor;
        orbit = planet.orbit / orbitFactor;

    planet.diameter = newDiameter;
    planetDiv.style.setProperty("width", newDiameter + "px");
    planetDiv.style.setProperty("height", newDiameter + "px");
    planetDiv.style.setProperty("margin-top", -(newDiameter / 2 + orbit / 2) + "px");
    planetDiv.style.setProperty("margin-left", -newDiameter / 2 + "px");
}

function updateOrbit(event) {
    console.log("Updating orbit for " + event.target.id.replace("-orbit-input", ""));
    var planet = allPlanets[event.target.id.replace("-orbit-input", "")],
        orbitDiv = document.getElementById(planet.name + "-orbit");

    planet.orbit = event.target.value / orbitFactor;
    // 31557600 seconds in a year
    // 1000 factor is because G is in m, not km
    planet.period = Math.pow(4 * Math.pow(Math.PI, 2) * Math.pow(planet.orbit / 2, 3) /
        (G * sun.mass), 1/2) / 1000 / 31557600;
    orbitDiv.style.setProperty("width", planet.orbit / orbitFactor + "px");
    orbitDiv.style.setProperty("height", planet.orbit / orbitFactor+ "px");
    orbitDiv.style.setProperty("margin-top", -planet.orbit / orbitFactor / 2 + "px");
    orbitDiv.style.setProperty("margin-left", -planet.orbit / orbitFactor / 2 + "px");
    orbitDiv.style.setProperty("-webkit-animation-duration", planet.period / periodFactor + "s");
    orbitDiv.style.setProperty("-moz-animation-duration", planet.period / periodFactor + "s");
    orbitDiv.style.setProperty("animation-duration", planet.period / periodFactor + "s");
}

function updatePeriod(event) {
    var planet = allPlanets[event.target.id.replace("-period-input", "")],
        body = document.getElementsByTagName("body")[0],
        planetDiv = document.getElementById(planet.name),
        orbitDiv = document.getElementById(planet.name + "-orbit");

    planet.period = event.target.value * 86400;
    // 1000 factor is because G is in m, not km
    planet.orbit = 2 * Math.pow(G * sun.mass * Math.pow(planet.period, 2) /
        (4 * Math.pow(Math.PI, 2)), 1/3) / 1000;

    planetDiv.style.setProperty("margin-top", -(planet.diameter / diameterFactor / 2 + planet.orbit / orbitFactor / 2) + "px");
    planetDiv.style.setProperty("margin-left", -planet.diameter / diameterFactor / 2 + "px");

    orbitDiv.style.setProperty("width", planet.orbit / orbitFactor + "px");
    orbitDiv.style.setProperty("height", planet.orbit / orbitFactor+ "px");
    orbitDiv.style.setProperty("margin-top", -planet.orbit / orbitFactor / 2 + "px");
    orbitDiv.style.setProperty("margin-left", -planet.orbit / orbitFactor / 2 + "px");
    orbitDiv.style.setProperty("-webkit-animation-duration", planet.period / periodFactor + "s");
    orbitDiv.style.setProperty("-moz-animation-duration", planet.period / periodFactor + "s");
    orbitDiv.style.setProperty("animation-duration", planet.period / periodFactor + "s");
}

function updatePeriodFactor(event) {
    periodFactor = event.target.value;
}

function updateOrbitFactor(event) {
    orbitFactor = event.target.value;
}

function updateDiameterFactor(event) {
    diameterFactor = event.target.value;
}

function updateSunDiameterFactor(event) {
    sunDiameterFactor = event.target.value;
}

function createSun() {
    var body = document.getElementsByTagName("body")[0];
    var sunDiv = document.getElementById("sun");
    if (!sunDiv) {
        var sunDiv = document.createElement("div");
        sunDiv.setAttribute("class", "star");
        sunDiv.setAttribute("id", "sun");
        body.appendChild(sunDiv);
    }
    sunDiv.style.setProperty("width", sun.diameter/sunDiameterFactor+"px");
    sunDiv.style.setProperty("height", sun.diameter/sunDiameterFactor+"px");
    sunDiv.style.setProperty("margin-top", -sun.diameter/sunDiameterFactor/2+"px");
    sunDiv.style.setProperty("margin-left", -sun.diameter/sunDiameterFactor/2+"px");
}

function createPlanets() {
    var body = document.getElementsByTagName("body")[0];
    for (var planet in allPlanets) {
        planet = allPlanets[planet];
        console.log("Creating " + planet.name);
        console.log(planet);

        var orbitDiv = document.createElement("div");
        orbitDiv.setAttribute("class", "orbit");
        orbitDiv.setAttribute("id", planet.name+"-orbit");
        orbitDiv.style.setProperty("width", planet.orbit / orbitFactor + "px");
        orbitDiv.style.setProperty("height", planet.orbit / orbitFactor + "px");
        orbitDiv.style.setProperty("margin-top", -planet.orbit / orbitFactor / 2 + "px");
        orbitDiv.style.setProperty("margin-left", -planet.orbit / orbitFactor / 2 + "px");
        orbitDiv.style.setProperty("-webkit-animation-duration", planet.period / periodFactor + "s");
        orbitDiv.style.setProperty("-moz-animation-duration", planet.period / periodFactor + "s");
        orbitDiv.style.setProperty("animation-duration", planet.period / periodFactor + "s");

        var planetDiv = document.createElement("div");
        planetDiv.setAttribute("class", "planet");
        planetDiv.setAttribute("id", planet.name);
        orbitDiv.appendChild(planetDiv);
        planetDiv.style.setProperty("width", planet.diameter / diameterFactor + "px");
        planetDiv.style.setProperty("height", planet.diameter / diameterFactor + "px");
        planetDiv.style.setProperty("background-color", planet.colour);
        planetDiv.style.setProperty("margin-top", -(planet.diameter / diameterFactor / 2 + planet.orbit / orbitFactor / 2) + "px");
        planetDiv.style.setProperty("margin-left", -planet.diameter / diameterFactor / 2 + "px");
        
        body.appendChild(orbitDiv);
    }
}

function createOptionsPanel() {
    var controls = document.getElementById("settings"),
        pKey,
        planet,
        div,
        e;

    for (pKey in allPlanets) {
        planet = allPlanets[pKey];

        div = document.createElement("div");
        div.setAttribute("class", "planet-options");
        div.setAttribute("id", planet.name + "-options");
        div.style.setProperty('background-color', planet.colour);
        controls.appendChild(div);

        //Planet name in bold
        e = document.createElement("b");
        e.innerHTML = planet.name 
        div.appendChild(e);
        div.appendChild(document.createElement("br"));

        //Label for diameter input
        e = document.createElement("label");
        e.setAttribute("for", planet.name + "-diameter-input");
        e.innerHTML = "Diameter (km):";
        div.appendChild(e);

        //Diameter input
        e = document.createElement("input");
        e.setAttribute("type", "number");
        e.setAttribute("id", planet.name + "-diameter-input");
        e.addEventListener("change", updateDiameter);
        div.appendChild(e);

        div.appendChild(document.createElement("br"));
        e.setAttribute("value", planet.diameter);

        //Label for period input
        e = document.createElement("label");
        e.setAttribute("for", planet.name + "-period-input");
        e.innerHTML = "Period (days):";
        div.appendChild(e);

        //Period input
        e = document.createElement("input");
        e.setAttribute("type", "number");
        e.setAttribute("id", planet.name + "-period-input");
        e.setAttribute("value", planet.period / 86400); //display in days
        e.addEventListener("change", updatePeriod)
        div.appendChild(e);
        div.appendChild(document.createElement("br"));

        e = document.createElement("label");
        e.setAttribute("for", planet.name + "-orbit-input");
        e.innerHTML = "Orbit diameter (km):";
        div.appendChild(e);
        e = document.createElement("input");
        e.setAttribute("type", "number");
        e.setAttribute("id", planet.name + "-orbit-input");
        e.addEventListener("change", updateOrbit)
        div.appendChild(e);
        div.appendChild(document.createElement("br"));
        e.setAttribute("value", planet.orbit);
    }
}

function setup() {
    var input;

    input = document.getElementById("period-factor");
    input.setAttribute("value", periodFactor);
    input.addEventListener("change", updatePeriodFactor);

    input = document.getElementById("diameter-factor");
    input.setAttribute("value", diameterFactor);
    input.addEventListener("change", updateDiameterFactor);

    input = document.getElementById("orbit-factor");
    input.setAttribute("value", orbitFactor);
    input.addEventListener("change", updateOrbitFactor);

    input = document.getElementById("sun-diameter-factor");
    input.setAttribute("value", sunDiameterFactor);
    input.addEventListener("change", updateSunDiameterFactor);

    createSun();
    createPlanets();
    createOptionsPanel();
}

//Set orbitFactor s.t. Mars' default orbit fills ~90% of screen
var orbitFactor = 228000000 * 2 / Math.min(window.innerWidth, window.innerHeight) * 1.1;
window.onload = setup;