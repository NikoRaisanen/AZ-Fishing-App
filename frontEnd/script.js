var allData;
var weatherinfo = [];

// Ajax to import sql query results from php to js
function get_data() {

        var oReq = new XMLHttpRequest(); // New request object
        oReq.onload = function() {
    
            // Convert data from php to javascript
            var data = this.responseText;
            allData = JSON.parse(data);

        };
        oReq.open("get", "../backEnd/phpToJs.php", true);
        oReq.send();
    
}

// Begin ajax to get db results from php + fetch api weather information
function set_allData() {
    get_data();
    get_weather();
}

// Resets allData global variable
function reset_allData() {
    get_data();
}

// Clear the dynamically generated cards
function remove_output () {
    document.getElementById("content").innerHTML = "";
}

function order_by_rating() {
    // Delete previous results
    remove_output();

    // Sort alphabetically by rating
    allData.sort(function(a, b) {
        return b.rating > a.rating;
    })

    // Put "Poor" ratings to beginning
    allData.sort(function(a, b) {
    res = a.rating.replace("Poor", "A");
    return b.rating > res;
    })

    // allData is now ordered by BEST to WORST fishing rating

    for (var entry of allData) {
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');

        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        img = document.createElement('img');
        temp2 = document.createElement('p');
        temp2.setAttribute('style', 'float: right');

        // Get image + current temp for each card based on name
        src = weather_and_image(entry.name)[0];
        temperature = weather_and_image(entry.name)[1];
        temp2.textContent = temperature;
        img.setAttribute('src', src);

        img.setAttribute('class', 'card-img-top');
        cbody = document.createElement('div');
        cbody.setAttribute('class', 'card-body');
        h5 = document.createElement('h5');
        h5.setAttribute('class', 'card-title');
        h5.textContent = entry.name;
        p1 = document.createElement('p');
        p1.setAttribute('class', 'card-text');
        p1.textContent = 'Region: ' + entry.region;
        p2 = document.createElement('p');
        p2.setAttribute('class', 'card-text');
        p2.textContent = 'Fishing rating: ' + entry.rating;

        card.appendChild(img);
        cbody.appendChild(h5);
        cbody.appendChild(p1);
        cbody.appendChild(p2);
        cbody.appendChild(temp2);
        card.appendChild(cbody);

        contentArea = document.getElementById('content');
        contentArea.appendChild(card);

        // Add line break to differentiate cards
        br = document.createElement('br');
        contentArea.appendChild(br);
        reset_allData();
    }
}

function order_by_name() {
    // Clear current results if they exist
    remove_output();
    search = document.getElementById('searchdiv');
    search.style.display = "block";
    document.getElementById('intro').innerText = "";
    getstarted = document.getElementById('getstarted');
    getstarted.style.visibility = "hidden";

    // Sort alphabetically by name
    allData.sort(function(a, b) {
        return a.name > b.name;
    })

    for (var entry of allData) {
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');

        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        img = document.createElement('img');
        temp2 = document.createElement('p');

        // Get image + current temp for each card based on name
        src = weather_and_image(entry.name)[0];
        temperature = weather_and_image(entry.name)[1];
        temp2.textContent = temperature;
        img.setAttribute('src', src);


        img.setAttribute('class', 'card-img-top');
        cbody = document.createElement('div');
        cbody.setAttribute('class', 'card-body');
        h5 = document.createElement('h5');
        h5.setAttribute('class', 'card-title');
        h5.textContent = entry.name;
        p1 = document.createElement('p');
        p1.setAttribute('class', 'card-text');
        p1.textContent = 'Region: ' + entry.region;
        p2 = document.createElement('p');
        p2.setAttribute('class', 'card-text');
        p2.textContent = 'Fishing rating: ' + entry.rating;
        temp2.setAttribute('style', 'float: right');

        card.appendChild(img);
        cbody.appendChild(h5);
        cbody.appendChild(p1);
        cbody.appendChild(p2);
        cbody.appendChild(temp2);
        card.appendChild(cbody);

        contentArea = document.getElementById('content');
        contentArea.appendChild(card);

        // Add line break to differentiate cards
        br = document.createElement('br');
        contentArea.appendChild(br);
        reset_allData();
    }
}

function order_by_region() {
    // Clear old results if present
    remove_output();
    for (var entry of allData) {
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');

        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        img = document.createElement('img');
        temp2 = document.createElement('p');
        temp2.setAttribute('style', 'float: right');

        // Get image + current temp for each card based on name
        src = weather_and_image(entry.name)[0];
        temperature = weather_and_image(entry.name)[1];
        temp2.textContent = temperature;
        img.setAttribute('src', src);

        img.setAttribute('class', 'card-img-top');
        cbody = document.createElement('div');
        cbody.setAttribute('class', 'card-body');
        h5 = document.createElement('h5');
        h5.setAttribute('class', 'card-title');
        h5.textContent = entry.name;
        p1 = document.createElement('p');
        p1.setAttribute('class', 'card-text');
        p1.textContent = 'Region: ' + entry.region;
        p2 = document.createElement('p');
        p2.setAttribute('class', 'card-text');
        p2.textContent = 'Fishing rating: ' + entry.rating;

        card.appendChild(img);
        cbody.appendChild(h5);
        cbody.appendChild(p1);
        cbody.appendChild(p2);
        cbody.appendChild(temp2);
        card.appendChild(cbody);

        contentArea = document.getElementById('content');
        contentArea.appendChild(card);

        // Add line break to differentiate cards
        br = document.createElement('br');
        contentArea.appendChild(br);
        reset_allData();
    }
}

// Show results depending on search query selected by user
function update_search(selection) {
    switch(selection) {
        case 'name':
            order_by_name();
            break;
        case 'region':
            order_by_region();
            break;
        case 'rating':
            order_by_rating();
            break;
        default:
            // Pass
        }
}

// Pre-load weather information via openweathermap API
async function get_weather() {
    // Array of cities to get the temperature for the bodies of water, in same order as switch in weather_and_image()
    var locations = ['greenwood,az,us', 'amado,az,us', 'safford,az,us', 'sonoita,az,us',
    'roosevelt,az,us', 'peoria,az,us', 'phoenix,az,us', 'tempe,az,us',
    'payson,az,us', 'greer,az,us', 'springerville,az,us'];

    // Get weather information for each location
    locations.forEach(function (location) {
        getJson('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=d65bb6fca23cbd6681e7005e2f6f58d0&units=imperial')
        .then(data => {
            weatherinfo.push(data.main.temp);
        });
    })
}

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

// Match each body of water with their respective image and weather info
function weather_and_image(name) {
    switch(name) {
        case 'Colorado River ':
            src = 'images/coloradoRiver.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[0] + ' °F';
            return [src, temp];
        case 'Arivaca Lake ':
            src = 'images/arivacaLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[1] + ' °F';
            return [src, temp];
        case 'Dankworth Pond ':
            src = 'images/dankworthPond.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[2] + ' °F';
            return [src, temp];
        case 'Frye Mesa Reservoir ':
            src = 'images/frymesaReservoir.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[2] + ' °F';
            return [src, temp];
        case 'Parker Canyon Lake ':
            src = 'images/parkercanyonLake.jpg';
           temp = 'Current temp: ☀️  ' + weatherinfo[3] + ' °F';
           return [src, temp];
        case 'Apache Lake ':
            src = 'images/apacheLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[4] + ' °F';
            return [src, temp];
        case 'Bartlett Lake ':
            src = 'images/bartlettLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[4] + ' °F';
            return [src, temp];
        case 'Canyon Lake ':
           src = 'images/canyonLake.jpg';
           temp = 'Current temp: ☀️  ' + weatherinfo[4] + ' °F';
           return [src, temp];
        case 'Lake Pleasant ':
            src = 'images/lakePleasant.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[5] + ' °F';
            return [src, temp];
        case 'Lower Salt River ':
            src = 'images/lowersaltRiver.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[6] + ' °F';
            return [src, temp];
        case 'Roosevelt Lake ':
            src = 'images/rooseveltLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[4] + ' °F';
            return [src, temp];
        case 'Saguaro Lake ':
            src = 'images/saguaroLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[4] + ' °F';
            return [src, temp];
        case 'Tempe Town Lake* ':
            src = 'images/tempetownLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[7] + ' °F';
            return [src, temp];
        case 'Bear Canyon Lake ':
            src = 'images/bearcanyonLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[8] + ' °F';
            return [src, temp];
        case 'Black Canyon Lake ':
            src = 'images/blackcanyonLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[8] + ' °F';
            return [src, temp];
        case 'Chevelon Canyon ':
            src = 'images/chevelonCanyon.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[8] + ' °F';
            return [src, temp];
        case 'Willow Springs Lake ':
            src = 'images/willowspringsLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[8] + ' °F';
            return [src, temp];
        case 'Woods Canyon Lake ':
            src = 'images/woodscanyonLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[8] + ' °F';
            return [src, temp];
        case 'Becker Lake ':
            src = 'images/beckerLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[10] + ' °F';
            return [src, temp];
        case 'Big Lake ':
            src = 'images/bigLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[10] + ' °F';
            return [src, temp];
        case 'Greer Lakes ':
            src = 'images/greerLakes.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[9] + ' °F';
            return [src, temp];
        case 'Carnero Lake':
            src = 'images/carneroLake.jpg';
            temp = 'Current temp: ☀️  ' + weatherinfo[10] + ' °F';
            return [src, temp];
        default:
            src = 'images/apacheLake.jpg';
            temp = 'No weather info';
            return [src, temp];
        }
}

/* 
Weather off:
Bartlett
Canyon lake
lower salt river
saguaro lake
willow springs lake
chevelon canyon
*/