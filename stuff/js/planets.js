var yearFactor = 50;

var allPlanets = [];
var earth = {};
earth['name'] = "earth";
earth['diameter'] = 50;
earth['orbit'] = 400;
earth['year'] = 365;
earth['colour'] = "blue";
allPlanets.push(earth);
var mercury = {};
mercury['name'] = "mercury";
mercury['diameter'] = 10;
mercury['orbit'] = 300;
mercury['year'] = 88;
mercury['colour'] = "brown";
allPlanets.push(mercury);

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

function reset() {

}

function updateDiameter(event) {
    var planet = document.getElementById(event.target.id.replace("-size", ""));
    var orbit = document.getElementById(event.target.id.replace("-size", "-orbit"))
    var orbitSize = window.getComputedStyle(orbit).width.replace("px", "");
    var sizeLabel = document.getElementById(event.target.id + "-label");
    var newSize = event.target.value;

    planet.style.setProperty('width', newSize+"px");
    planet.style.setProperty('height', newSize+"px");
    planet.style.setProperty('margin-left', -newSize/2+"px");
    planet.style.setProperty('margin-top', -(orbitSize/2+newSize/2)+"px");
    sizeLabel.innerHTML = "Diameter: " + window.getComputedStyle(planet).width;
}

function createPlanets() {
    var body = document.getElementsByTagName("body")[0];
    for (var i = 0; i < allPlanets.length; ++i) {
        var dia = allPlanets[i]['diameter'];
        var orb = allPlanets[i]['orbit'];

        var planetDiv = document.createElement("div");
        planetDiv.setAttribute("class", "planet");
        planetDiv.setAttribute("id", allPlanets[i]['name']);
        planetDiv.style.setProperty("width", dia+"px");
        planetDiv.style.setProperty("height", dia+"px");
        planetDiv.style.setProperty("background-color", allPlanets[i]['colour']);
        planetDiv.style.setProperty("margin-top", -(dia/2+orb/2)+"px");
        planetDiv.style.setProperty("margin-left", -dia/2+"px");

        var orbitDiv = document.createElement("div");
        orbitDiv.setAttribute("class", "orbit");
        orbitDiv.setAttribute("id", allPlanets[i]['name']+"-orbit");
        orbitDiv.style.setProperty("width", orb+"px");
        orbitDiv.style.setProperty("height", orb+"px");
        orbitDiv.style.setProperty("margin-top", -orb/2+"px");
        orbitDiv.style.setProperty("margin-left", -orb/2+"px");
        orbitDiv.style.setProperty("-webkit-animation-duration",
            allPlanets[i]['year']/yearFactor+"s");

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
        label.innerHTML = "Diameter: " + window.getComputedStyle(planets[i]).width;
        div.appendChild(label);

        var input = document.createElement("input");
        input.setAttribute("type", "range");
        input.setAttribute("id", planet+"-size");
        input.setAttribute("min", "5");
        input.setAttribute("max", "200");
        input.setAttribute("value", window.getComputedStyle(planets[i]).width.replace("px", ""));
        input.addEventListener("change", updateDiameter);
        div.appendChild(input);

        controls.appendChild(div);
    }
}

function setup() {
    createPlanets();
    createOptionPanel();
}

window.onload = setup