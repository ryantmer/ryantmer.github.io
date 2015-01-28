var yearFactor = 0.02;
var diameterFactor = 1;
var sunDiameterFactor = 0.01;
var orbitFactor = 0.0002;

//Diameter in thousands of km
//Orbit diameter in thousands of km
//Years are in days
var sun = {};
sun['name'] = "sun";
sun['diameter'] = 695.8*2;
sun['orbit'] = 0;
sun['year'] = 0;
sun['colour'] = "yellow";
var allPlanets = [];
var mercury = {};
mercury['name'] = "Mercury";
mercury['diameter'] = 2.44*2;
mercury['orbit'] = 58000*2;
mercury['year'] = 88;
mercury['colour'] = "brown";
allPlanets.push(mercury);
var venus = {};
venus['name'] = "Venus";
venus['diameter'] = 6.052*2;
venus['orbit'] = 108000*2;
venus['year'] = 224.7;
venus['colour'] = "darkolivegreen";
allPlanets.push(venus);
var earth = {};
earth['name'] = "Earth";
earth['diameter'] = 6.371*2;
earth['orbit'] = 150000*2;
earth['year'] = 365.25;
earth['colour'] = "blue";
allPlanets.push(earth);
var mars = {};
mars['name'] = "Mars";
mars['diameter'] = 3.390*2;
mars['orbit'] = 228000*2;
mars['year'] = 687;
mars['colour'] = "red";
allPlanets.push(mars);
var jupiter = {};
jupiter['name'] = "Jupiter";
jupiter['diameter'] = 69.911*2;
jupiter['orbit'] = 778000*2;
jupiter['year'] = 4332;
jupiter['colour'] = "orangered";
allPlanets.push(jupiter);
var saturn = {};
saturn['name'] = "Saturn";
saturn['diameter'] = 58.232*2;
saturn['orbit'] = 1429000*2;
saturn['year'] = 10760;
saturn['colour'] = "LightGoldenRodYellow";
allPlanets.push(saturn);
var uranus = {};
uranus['name'] = "Uranus";
uranus['diameter'] = 25.362*2;
uranus['orbit'] = 2871000*2;
uranus['year'] = 30700;
uranus['colour'] = "LightBlue";
allPlanets.push(uranus);
var neptune = {};
neptune['name'] = "Neptune";
neptune['diameter'] = 24.622*2;
neptune['orbit'] = 4504000*2;
neptune['year'] = 60200;
neptune['colour'] = "DarkBlue";
allPlanets.push(neptune);

var colours = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure",
            "Beige","Bisque","BlanchedAlmond","Blue","BlueViolet",
            "Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral",
            "CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan",
            "DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki",
            "DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed",
            "DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray",
            "DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue",
            "DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen",
            "Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey",
            "Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory",
            "Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon",
            "LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray",
            "LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen",
            "LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue",
            "LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon",
            "MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple",
            "MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
            "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin",
            "NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed",
            "Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed",
            "PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple",
            "Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown",
            "SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray",
            "SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle",
            "Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

function changeColours() {
    var planets = document.getElementsByClassName("planet");
    for (var i = 0; i < planets.length; ++i) {
        var colour = colours[Math.floor(Math.random()*colours.length)];
        planets[i].style.setProperty('background-color', colour);
        var planetOptions = document.getElementById(planets[i].getAttribute("id") + "-options");
        planetOptions.style.setProperty('background-color', colour);
    }
}

function updateDiameter(event) {
    var planet = document.getElementById(event.target.id.replace("-size", ""));
    var orbit = document.getElementById(event.target.id.replace("-size", "-orbit"))
    var orbitSize = window.getComputedStyle(orbit).width.replace("px", "");
    var newSize = event.target.value;

    planet.style.setProperty('width', newSize+"px");
    planet.style.setProperty('height', newSize+"px");
    planet.style.setProperty('margin-left', -newSize/2+"px");
    planet.style.setProperty('margin-top', -(orbitSize/2+newSize/2)+"px");
    sizeLabel.innerHTML = "Diameter: " + window.getComputedStyle(planet).width;
}

function updateFactor(event) {
    if (event.target.id == "yearFactor") {
        yearFactor = event.target.value;
    } else if (event.target.id == "diameterFactor") {
        diameterFactor = event.target.value;
    } else if (event.target.id == "sunDiameterFactor") {
        sunDiameterFactor = event.target.value;
    } else if (event.target.id == "orbitFactor") {
        orbitFactor = event.target.value;
    }
    updatePlanets();
    updateSun();
}

function updateSun() {
    var body = document.getElementsByTagName("body")[0];
    var sunDiv = document.getElementById("sun");
    if (!sunDiv) {
        var sunDiv = document.createElement("div");
        sunDiv.setAttribute("class", "star");
        sunDiv.setAttribute("id", "sun");
    }
    sunDiv.style.setProperty("width", sun['diameter']*sunDiameterFactor+"px");
    sunDiv.style.setProperty("height", sun['diameter']*sunDiameterFactor+"px");
    sunDiv.style.setProperty("margin-top", -sun['diameter']*sunDiameterFactor/2+"px");
    sunDiv.style.setProperty("margin-left", -sun['diameter']*sunDiameterFactor/2+"px");
    body.appendChild(sunDiv);
}

function updatePlanets() {
    var body = document.getElementsByTagName("body")[0];
    for (var i = 0; i < allPlanets.length; ++i) {
        var dia = allPlanets[i]['diameter']*diameterFactor;
        var orb = allPlanets[i]['orbit']*orbitFactor;

        var planetDiv = document.getElementById(allPlanets[i]['name'])
        if (!planetDiv) {
            var planetDiv = document.createElement("div");
            planetDiv.setAttribute("class", "planet");
            planetDiv.setAttribute("id", allPlanets[i]['name']);
        }
        planetDiv.style.setProperty("width", dia+"px");
        planetDiv.style.setProperty("height", dia+"px");
        planetDiv.style.setProperty("background-color", allPlanets[i]['colour']);
        planetDiv.style.setProperty("margin-top", -(dia/2+orb/2)+"px");
        planetDiv.style.setProperty("margin-left", -dia/2+"px");

        var orbitDiv = document.getElementById(allPlanets[i]['name']+"-orbit");
        if (!orbitDiv) {
            var orbitDiv = document.createElement("div");
            orbitDiv.setAttribute("class", "orbit");
            orbitDiv.setAttribute("id", allPlanets[i]['name']+"-orbit");
        }
        orbitDiv.style.setProperty("width", orb+"px");
        orbitDiv.style.setProperty("height", orb+"px");
        orbitDiv.style.setProperty("margin-top", -orb/2+"px");
        orbitDiv.style.setProperty("margin-left", -orb/2+"px");
        orbitDiv.style.setProperty("-webkit-animation-duration",
            allPlanets[i]['year']*yearFactor+"s");

        orbitDiv.appendChild(planetDiv);
        body.appendChild(orbitDiv);
    }
}

function createOptionPanel() {
    var planets = document.getElementsByClassName("planet");
    var controls = document.getElementById("controls");
    for (var i = 0; i < planets.length; ++i) {
        var planet = planets[i].getAttribute("id");

        var div = document.createElement("div");
        div.setAttribute("class", "planet-options");
        div.setAttribute("id", planet + "-options");
        div.style.setProperty('background-color',
            window.getComputedStyle(planets[i]).backgroundColor);

        var name = document.createElement("b");
        name.innerHTML = planet.substr(0,1).toUpperCase() + planet.substr(1);
        div.appendChild(name);
        div.appendChild(document.createElement("br"));

        var label = document.createElement("label");
        label.setAttribute("id", planet+"-size-label");
        label.setAttribute("for", planet+"-size");
        label.innerHTML = "Diameter (km^1000): ";
        div.appendChild(label);

        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", planet+"-size");
        input.setAttribute("value", window.getComputedStyle(planets[i]).width.replace("px", ""));
        input.style.setProperty("width", "100px");
        input.addEventListener("change", updateDiameter);
        div.appendChild(input);

        controls.appendChild(div);
    }
}

function setup() {
    var yearFactorInput = document.getElementById("yearFactor");
    yearFactorInput.setAttribute("value", yearFactor);
    yearFactorInput.addEventListener("change", updateFactor);
    var diameterFactorInput = document.getElementById("diameterFactor");
    diameterFactorInput.value = diameterFactor;
    diameterFactorInput.addEventListener("change", updateFactor);
    var orbitFactorInput = document.getElementById("orbitFactor");
    orbitFactorInput.value = orbitFactor;
    orbitFactorInput.addEventListener("change", updateFactor);
    var sunDiameterFactorInput = document.getElementById("sunDiameterFactor");
    sunDiameterFactorInput.value = sunDiameterFactor;
    sunDiameterFactorInput.addEventListener("change", updateFactor);
    updateSun();
    updatePlanets();
    createOptionPanel();
}

window.onload = setup