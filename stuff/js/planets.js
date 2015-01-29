var periodFactor = 1e6;
var diameterFactor = 1e3;
var sunDiameterFactor = 100e3; //Sun has its own scaling factor, due to its size
var orbitFactor = 1e6;
var G = 6.67384e-11;

//Diameter, orbit in km; period in seconds
var sun = {};
sun['name'] = "sun";
sun['diameter'] = 695800*2;
sun['colour'] = "yellow";
sun['mass'] = 1.989e30;
var allPlanets = {};
var mercury = {};
mercury['name'] = "Mercury";
mercury['diameter'] = 2440*2;
mercury['colour'] = "brown";
mercury['period'] = 7603200;
mercury['orbit'] = 58000000*2;
allPlanets['Mercury'] = mercury;
var venus = {};
venus['name'] = "Venus";
venus['diameter'] = 6052*2;
venus['colour'] = "darkolivegreen";
venus['period'] = 19414080;
venus['orbit'] = 108000000*2;
allPlanets['Venus'] = venus;
var earth = {};
earth['name'] = "Earth";
earth['diameter'] = 6371*2;
earth['colour'] = "powderblue";
earth['period'] = 31557600;
earth['orbit'] = 150000000*2;
allPlanets['Earth'] = earth;
var mars = {};
mars['name'] = "Mars";
mars['diameter'] = 3390*2;
mars['colour'] = "red";
mars['period'] = 59356800;
mars['orbit'] = 228000000*2;
allPlanets['Mars'] = mars;

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
    console.log(event.target.id);
    var planet = allPlanets[event.target.id.replace("-diameter-input", "")];
    planet['diameter'] = event.target.value;
    updatePlanets();
    updateOptionsPanel();
}

function updateOrbit(event) {
    var planet = allPlanets[event.target.id.replace("-orbit-input", "")];
    planet['orbit'] = event.target.value;
    //Calculation gives 1/1000ths of a year, so adjust
    planet['period'] = Math.pow(4*Math.pow(Math.PI, 2)*Math.pow(planet['orbit']/2, 3)/
        (G*sun['mass']), 1/2)/1000*3.15569e7;
    updatePlanets();
    updateOptionsPanel();
}

function updatePeriod(event) {
    var planet = allPlanets[event.target.id.replace("-period-input", "")];
    planet['period'] = event.target.value*86400;
    //1000 is because G is in m, not km
    planet['orbit'] = 2*Math.pow(G*sun['mass']*Math.pow(planet['period'], 2)/
        (4*Math.pow(Math.PI, 2)), 1/3)/1000;
    updatePlanets();
    updateOptionsPanel();
}

function updateFactor(event) {
    if (event.target.id == "period-factor") {
        periodFactor = event.target.value;
    } else if (event.target.id == "diameter-factor") {
        diameterFactor = event.target.value;
    } else if (event.target.id == "sun-diameter-factor") {
        sunDiameterFactor = event.target.value;
    } else if (event.target.id == "orbit-factor") {
        orbitFactor = event.target.value;
    }
    updatePlanets();
    updateSun();
}

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

function updateSun() {
    var body = document.getElementsByTagName("body")[0];
    var sunDiv = document.getElementById("sun");
    if (!sunDiv) {
        var sunDiv = document.createElement("div");
        sunDiv.setAttribute("class", "star");
        sunDiv.setAttribute("id", "sun");
        body.appendChild(sunDiv);
    }
    sunDiv.style.setProperty("width", sun['diameter']/sunDiameterFactor+"px");
    sunDiv.style.setProperty("height", sun['diameter']/sunDiameterFactor+"px");
    sunDiv.style.setProperty("margin-top", -sun['diameter']/sunDiameterFactor/2+"px");
    sunDiv.style.setProperty("margin-left", -sun['diameter']/sunDiameterFactor/2+"px");
}

function updatePlanets() {
    var body = document.getElementsByTagName("body")[0];
    for (var planet in allPlanets) {
        planet = allPlanets[planet];
        var dia = planet['diameter']/diameterFactor;
        var orb = planet['orbit']/orbitFactor;

        var planetDiv = document.getElementById(planet['name'])
        if (!planetDiv) {
            var planetDiv = document.createElement("div");
            planetDiv.setAttribute("class", "planet");
            planetDiv.setAttribute("id", planet['name']);
        }
        planetDiv.style.setProperty("width", dia+"px");
        planetDiv.style.setProperty("height", dia+"px");
        planetDiv.style.setProperty("background-color", planet['colour']);
        planetDiv.style.setProperty("margin-top", -(dia/2+orb/2)+"px");
        planetDiv.style.setProperty("margin-left", -dia/2+"px");

        var orbitDiv = document.getElementById(planet['name']+"-orbit");
        if (!orbitDiv) {
            var orbitDiv = document.createElement("div");
            orbitDiv.setAttribute("class", "orbit");
            orbitDiv.setAttribute("id", planet['name']+"-orbit");
            orbitDiv.appendChild(planetDiv);
            body.appendChild(orbitDiv);
        }
        orbitDiv.style.setProperty("width", orb+"px");
        orbitDiv.style.setProperty("height", orb+"px");
        orbitDiv.style.setProperty("margin-top", -orb/2+"px");
        orbitDiv.style.setProperty("margin-left", -orb/2+"px");
        orbitDiv.style.setProperty("-webkit-animation-duration",
            planet['period']/periodFactor+"s");
    }
}

function updateOptionsPanel() {
    var controls = document.getElementById("settings");
    for (var planet in allPlanets) {
        planet = allPlanets[planet];
        var pName = planet["name"];

        var div = document.getElementById(pName + "-options");
        if (!div) {
            var div = document.createElement("div");
            div.setAttribute("class", "planet-options");
            div.setAttribute("id", pName + "-options");
        }
        div.style.setProperty('background-color', planet["colour"]);

        var e = document.getElementById(pName+"-label");
        if (!e) {
            var e = document.createElement("b");
            e.setAttribute("id", pName+"-label");
            e.style.setProperty("text-align", "left");
            e.innerHTML = pName
            div.appendChild(e);
            div.appendChild(document.createElement("br"));
        }

        e = document.getElementById(pName+"-diameter-input");
        if (!e) {
            e = document.createElement("label");
            e.setAttribute("for", pName+"-diameter-input");
            e.innerHTML = "Diameter (km):";
            div.appendChild(e);
            e = document.createElement("input");
            e.setAttribute("type", "number");
            e.setAttribute("id", pName+"-diameter-input");
            e.addEventListener("change", updateDiameter);
            div.appendChild(e);
            div.appendChild(document.createElement("br"));
        }
        e.setAttribute("value", planet['diameter']);

        e = document.getElementById(pName+"-period-input");
        if (!e) {
            e = document.createElement("label");
            e.setAttribute("for", pName+"-period-input");
            e.innerHTML = "Period (days):";
            div.appendChild(e);
            e = document.createElement("input");
            e.setAttribute("type", "number");
            e.setAttribute("id", pName+"-period-input");
            e.addEventListener("change", updatePeriod)
            div.appendChild(e);
            div.appendChild(document.createElement("br"));
        }
        e.setAttribute("value", planet['period']/86400); //display in days

        e = document.getElementById(pName+"-orbit-input");
        if (!e) {
            e = document.createElement("label");
            e.setAttribute("for", pName+"-orbit-input");
            e.innerHTML = "Orbit diameter (km):";
            div.appendChild(e);
            e = document.createElement("input");
            e.setAttribute("type", "number");
            e.setAttribute("id", pName+"-orbit-input");
            e.addEventListener("change", updateOrbit)
            div.appendChild(e);
            div.appendChild(document.createElement("br"));
        }
        e.setAttribute("value", planet['orbit']);

        controls.appendChild(div);
    }
}

function setup() {
    var x = window.innerWidth;
    var y = window.innerHeight;

    var periodFactorInput = document.getElementById("period-factor");
    periodFactorInput.setAttribute("value", periodFactor);
    periodFactorInput.addEventListener("change", updateFactor);
    var diameterFactorInput = document.getElementById("diameter-factor");
    diameterFactorInput.value = diameterFactor;
    diameterFactorInput.addEventListener("change", updateFactor);
    var orbitFactorInput = document.getElementById("orbit-factor");
    orbitFactorInput.value = orbitFactor;
    orbitFactorInput.addEventListener("change", updateFactor);
    var sunDiameterFactorInput = document.getElementById("sun-diameter-factor");
    sunDiameterFactorInput.value = sunDiameterFactor;
    sunDiameterFactorInput.addEventListener("change", updateFactor);

    updateSun();
    updatePlanets();
    updateOptionsPanel();
}

window.onload = setup