// Ajax to import sql query results from php to js
var allData;
var testvar = "hi";
var weatherinfo = [];
function get_data() {

        var oReq = new XMLHttpRequest(); // New request object
        oReq.onload = function() {
            // This is where you handle what to do with the response.
            // The actual data is found on this.responseText
            // alert(this.responseText); // Will alert: 42

            // Convert data from php to javascript
            var data = this.responseText;
            // console.log(data);
            var dataArray = data.split("\n");
            console.log(data);
            allData = JSON.parse(data);
            // console.log(allData);

        };
        oReq.open("get", "../backEnd/phpToJs.php", true);
        //                               ^ Don't block the rest of the execution.
        //                                 Don't wait until the request finishes to
        //                                 continue.
        oReq.send();
        // console.log(dataArray);
        // return dataArray;
}

function set_allData() {
    get_data();
    get_weather();
    console.log(allData);
    console.log(testvar);
}

function printing_var() {
    console.log(allData);
}

function populate_results() {
    remove_output();    // Clear current results if they exist
    search = document.getElementById('searchdiv');
    search.style.display = "block";
    document.getElementById('intro').innerText = "";
    getstarted = document.getElementById('getstarted');
    getstarted.style.visibility = "hidden";

    var output = '';
    for (var entry of allData) {
        console.log(entry.id);

        id = entry.id;
        rating = entry.rating;
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');
        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        img = document.createElement('img');


        // Switch to get proper image src
        switch(entry.name) {
            case 'Colorado River ':
                img.setAttribute('src', 'images/coloradoRiver.jpg');
                break;
            case 'Arivaca Lake ':
                img.setAttribute('src', 'images/arivacaLake.jpg');
                break;
            case 'Dankworth Pond ':
                img.setAttribute('src', 'images/dankworthPond.jpg');
                break;
            case 'Frye Mesa Reservoir ':
                img.setAttribute('src', 'images/frymesaReservoir.jpg');
                break;
            case 'Parker Canyon Lake ':
                img.setAttribute('src', 'images/parkercanyonLake.jpg');
                break;
            case 'Apache Lake ':
                img.setAttribute('src', 'images/apacheLake.jpg');
                break;
            case 'Bartlett Lake ':
                img.setAttribute('src', 'images/bartlettLake.jpg');
                break;
            case 'Canyon Lake ':
                img.setAttribute('src', 'images/canyonLake.jpg');
                break;
            case 'Lake Pleasant ':
                img.setAttribute('src', 'images/lakePleasant.jpg');
                break;
            case 'Lower Salt River ':
                img.setAttribute('src', 'images/lowersaltRiver.jpg');
                break;
            case 'Roosevelt Lake ':
                img.setAttribute('src', 'images/rooseveltLake.jpg');
                break;
            case 'Saguaro Lake ':
                img.setAttribute('src', 'images/saguaroLake.jpg');
                break;
            case 'Tempe Town Lake* ':
                img.setAttribute('src', 'images/tempetownLake.jpg');
                break;
            case 'Bear Canyon Lake ':
                img.setAttribute('src', 'images/bearcanyonLake.jpg');
                break;
            case 'Black Canyon Lake ':
                img.setAttribute('src', 'images/blackcanyonLake.jpg');
                break;
            case 'Chevelon Canyon ':
                img.setAttribute('src', 'images/chevelonCanyon.jpg');
                break;
            case 'Willow Springs Lake ':
                img.setAttribute('src', 'images/willowspringsLake.jpg');
                break;
            case 'Woods Canyon Lake ':
                img.setAttribute('src', 'images/woodscanyonLake.jpg');
                break;
            case 'Becker Lake ':
                img.setAttribute('src', 'images/beckerLake.jpg');
                break;
            case 'Big Lake ':
                img.setAttribute('src', 'images/bigLake.jpg');
                break;
            case 'Greer Lakes ':
                img.setAttribute('src', 'images/greerLakes.jpg');
                break;
            case 'Carnero Lake ':
                img.setAttribute('src', 'images/carneroLake.jpg');
                break;
            default:
                console.log('default switch executed');
                img.setAttribute('src', 'images/saguaroLake.jpg');
        }


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
        card.appendChild(cbody);

        contentArea = document.getElementById('content');

        contentArea.appendChild(card);
        // Add line break to differentiate cards
        br = document.createElement('br');
        contentArea.appendChild(br);
    }
    document.getElementById("testcontent").innerHTML = output;
}

// Resets allData variable and clears generated output
function reset_allData() {
    get_data();
}

function remove_output () {
    document.getElementById("content").innerHTML = "";
}

function order_by_rating() {
    for (var i = 0; i < allData.length; i++) {
        console.log(i)
        console.log(allData[i]);
    }
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
    console.log(allData);

    // Delete previous results
    document.getElementById("content").innerHTML = " ";

    for (var entry of allData) {
        console.log(entry.id);

        id = entry.id;
        rating = entry.rating;
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');
        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        img = document.createElement('img');


        // Switch to get proper image src
        switch(entry.name) {
            case 'Colorado River ':
                img.setAttribute('src', 'images/coloradoRiver.jpg');
                break;
            case 'Arivaca Lake ':
                img.setAttribute('src', 'images/arivacaLake.jpg');
                break;
            case 'Dankworth Pond ':
                img.setAttribute('src', 'images/dankworthPond.jpg');
                break;
            case 'Frye Mesa Reservoir ':
                img.setAttribute('src', 'images/frymesaReservoir.jpg');
                break;
            case 'Parker Canyon Lake ':
                img.setAttribute('src', 'images/parkercanyonLake.jpg');
                break;
            case 'Apache Lake ':
                img.setAttribute('src', 'images/apacheLake.jpg');
                break;
            case 'Bartlett Lake ':
                img.setAttribute('src', 'images/bartlettLake.jpg');
                break;
            case 'Canyon Lake ':
                img.setAttribute('src', 'images/canyonLake.jpg');
                break;
            case 'Lake Pleasant ':
                img.setAttribute('src', 'images/lakePleasant.jpg');
                break;
            case 'Lower Salt River ':
                img.setAttribute('src', 'images/lowersaltRiver.jpg');
                break;
            case 'Roosevelt Lake ':
                img.setAttribute('src', 'images/rooseveltLake.jpg');
                break;
            case 'Saguaro Lake ':
                img.setAttribute('src', 'images/saguaroLake.jpg');
                break;
            case 'Tempe Town Lake* ':
                img.setAttribute('src', 'images/tempetownLake.jpg');
                break;
            case 'Bear Canyon Lake ':
                img.setAttribute('src', 'images/bearcanyonLake.jpg');
                break;
            case 'Black Canyon Lake ':
                img.setAttribute('src', 'images/blackcanyonLake.jpg');
                break;
            case 'Chevelon Canyon ':
                img.setAttribute('src', 'images/chevelonCanyon.jpg');
                break;
            case 'Willow Springs Lake ':
                img.setAttribute('src', 'images/willowspringsLake.jpg');
                break;
            case 'Woods Canyon Lake ':
                img.setAttribute('src', 'images/woodscanyonLake.jpg');
                break;
            case 'Becker Lake ':
                img.setAttribute('src', 'images/beckerLake.jpg');
                break;
            case 'Big Lake ':
                img.setAttribute('src', 'images/bigLake.jpg');
                break;
            case 'Greer Lakes ':
                img.setAttribute('src', 'images/greerLakes.jpg');
                break;
            case 'Carnero Lake ':
                img.setAttribute('src', 'images/carneroLake.jpg');
                break;
            default:
                console.log('default switch executed');
                img.setAttribute('src', 'images/saguaroLake.jpg');
        }


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
    remove_output();    // Clear current results if they exist
    search = document.getElementById('searchdiv');
    search.style.display = "block";
    document.getElementById('intro').innerText = "";
    getstarted = document.getElementById('getstarted');
    getstarted.style.visibility = "hidden";

    console.log('THis is the order by region function: \n' + JSON.stringify(allData));
    for (var i = 0; i < allData.length; i++) {
        console.log(i)
        console.log(allData[i]);
    }
    // Sort alphabetically by name
    allData.sort(function(a, b) {
        return a.name > b.name;
    })
    console.log(allData);

    for (var entry of allData) {
        console.log(entry.id);

        id = entry.id;
        rating = entry.rating;
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');
        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        // card.setAttribute('style', 'float: left');
        img = document.createElement('img');
        temp = document.createElement('p');
        temp.textContent = "TEMP HERE";


        // Switch to get proper image src
        switch(entry.name) {
            case 'Colorado River ':
                img.setAttribute('src', 'images/coloradoRiver.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[0] + ' °F';
                break;
            case 'Arivaca Lake ':
                img.setAttribute('src', 'images/arivacaLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[1] + ' °F';
                break;
            case 'Dankworth Pond ':
                img.setAttribute('src', 'images/dankworthPond.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[2] + ' °F';
                break;
            case 'Frye Mesa Reservoir ':
                img.setAttribute('src', 'images/frymesaReservoir.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[3] + ' °F';
                break;
            case 'Parker Canyon Lake ':
                img.setAttribute('src', 'images/parkercanyonLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[4] + ' °F';
                break;
            case 'Apache Lake ':
                img.setAttribute('src', 'images/apacheLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[5] + ' °F';
                break;
            case 'Bartlett Lake ':
                img.setAttribute('src', 'images/bartlettLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[6] + ' °F';
                break;
            case 'Canyon Lake ':
                img.setAttribute('src', 'images/canyonLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[7] + ' °F';
                break;
            case 'Lake Pleasant ':
                img.setAttribute('src', 'images/lakePleasant.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[8] + ' °F';
                break;
            case 'Lower Salt River ':
                img.setAttribute('src', 'images/lowersaltRiver.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[9] + ' °F';
                break;
            case 'Roosevelt Lake ':
                img.setAttribute('src', 'images/rooseveltLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[10] + ' °F';
                break;
            case 'Saguaro Lake ':
                img.setAttribute('src', 'images/saguaroLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[11] + ' °F';
                break;
            case 'Tempe Town Lake* ':
                img.setAttribute('src', 'images/tempetownLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[12] + ' °F';
                break;
            case 'Bear Canyon Lake ':
                img.setAttribute('src', 'images/bearcanyonLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[13] + ' °F';
                break;
            case 'Black Canyon Lake ':
                img.setAttribute('src', 'images/blackcanyonLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[14] + ' °F';
                break;
            case 'Chevelon Canyon ':
                img.setAttribute('src', 'images/chevelonCanyon.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[15] + ' °F';
                break;
            case 'Willow Springs Lake ':
                img.setAttribute('src', 'images/willowspringsLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[16] + ' °F';
                break;
            case 'Woods Canyon Lake ':
                img.setAttribute('src', 'images/woodscanyonLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[17] + ' °F';
                break;
            case 'Becker Lake ':
                img.setAttribute('src', 'images/beckerLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[18] + ' °F';
                break;
            case 'Big Lake ':
                img.setAttribute('src', 'images/bigLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[19] + ' °F';
                break;
            case 'Greer Lakes ':
                img.setAttribute('src', 'images/greerLakes.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[20] + ' °F';
                break;
            case 'Carnero Lake ':
                img.setAttribute('src', 'images/carneroLake.jpg');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[21] + ' °F';
                break;
            default:
                console.log('default switch executed');
                temp.textContent = 'Current temp: ☀️  ' + weatherinfo[0] + ' °F';
                img.setAttribute('src', 'images/saguaroLake.jpg');
        }


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
        temp.setAttribute('style', 'float: right');


        card.appendChild(img);
        cbody.appendChild(h5);
        cbody.appendChild(p1);
        cbody.appendChild(p2);
        cbody.appendChild(temp);
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
    document.getElementById("content").innerHTML = " ";
    console.log('THis is the order by region function: \n' + JSON.stringify(allData));
    for (var entry of allData) {
        console.log(entry.id);

        id = entry.id;
        rating = entry.rating;
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');
        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        img = document.createElement('img');


        // Switch to get proper image src
        switch(entry.name) {
            case 'Colorado River ':
                img.setAttribute('src', 'images/coloradoRiver.jpg');
                break;
            case 'Arivaca Lake ':
                img.setAttribute('src', 'images/arivacaLake.jpg');
                break;
            case 'Dankworth Pond ':
                img.setAttribute('src', 'images/dankworthPond.jpg');
                break;
            case 'Frye Mesa Reservoir ':
                img.setAttribute('src', 'images/frymesaReservoir.jpg');
                break;
            case 'Parker Canyon Lake ':
                img.setAttribute('src', 'images/parkercanyonLake.jpg');
                break;
            case 'Apache Lake ':
                img.setAttribute('src', 'images/apacheLake.jpg');
                break;
            case 'Bartlett Lake ':
                img.setAttribute('src', 'images/bartlettLake.jpg');
                break;
            case 'Canyon Lake ':
                img.setAttribute('src', 'images/canyonLake.jpg');
                break;
            case 'Lake Pleasant ':
                img.setAttribute('src', 'images/lakePleasant.jpg');
                break;
            case 'Lower Salt River ':
                img.setAttribute('src', 'images/lowersaltRiver.jpg');
                break;
            case 'Roosevelt Lake ':
                img.setAttribute('src', 'images/rooseveltLake.jpg');
                break;
            case 'Saguaro Lake ':
                img.setAttribute('src', 'images/saguaroLake.jpg');
                break;
            case 'Tempe Town Lake* ':
                img.setAttribute('src', 'images/tempetownLake.jpg');
                break;
            case 'Bear Canyon Lake ':
                img.setAttribute('src', 'images/bearcanyonLake.jpg');
                break;
            case 'Black Canyon Lake ':
                img.setAttribute('src', 'images/blackcanyonLake.jpg');
                break;
            case 'Chevelon Canyon ':
                img.setAttribute('src', 'images/chevelonCanyon.jpg');
                break;
            case 'Willow Springs Lake ':
                img.setAttribute('src', 'images/willowspringsLake.jpg');
                break;
            case 'Woods Canyon Lake ':
                img.setAttribute('src', 'images/woodscanyonLake.jpg');
                break;
            case 'Becker Lake ':
                img.setAttribute('src', 'images/beckerLake.jpg');
                break;
            case 'Big Lake ':
                img.setAttribute('src', 'images/bigLake.jpg');
                break;
            case 'Greer Lakes ':
                img.setAttribute('src', 'images/greerLakes.jpg');
                break;
            case 'Carnero Lake ':
                img.setAttribute('src', 'images/carneroLake.jpg');
                break;
            default:
                console.log('default switch executed');
                img.setAttribute('src', 'images/saguaroLake.jpg');
        }


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
        card.appendChild(cbody);

        contentArea = document.getElementById('content');

        contentArea.appendChild(card);
        // Add line break to differentiate cards
        br = document.createElement('br');
        contentArea.appendChild(br);
        reset_allData();
    }
}

function update_search(selection) {
    switch(selection) {
        case 'name':
            console.log("name selected");
            order_by_name();
            break;
        case 'region':
            console.log("region selected");
            order_by_region();
            break;
        case 'rating':
            console.log("rating selected");
            order_by_rating();
            break;
        default:
            console.log('default case for update_search function');
        }
}

// Get pre-load weather information via API
async function get_weather() {
    var locations = ['parker', 'amado', 'safford', 'safford', 'sonoita', 'roosevelt', 'carefree', 'roosevelt', 'morristown', 'roosevelt', 'roosevelt', 'roosevelt', 'tempe', 'payson,928', 'heber', 'heber', 'payson,928', 'payson,928', 'springerville', 'springerville', 'greer', 'springerville'];

    locations.forEach(function (location) {
        console.log(location);
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








// function get_weather() {

//     var oReq = new XMLHttpRequest(); // New request object
//     oReq.onload = function() {
//         // This is where you handle what to do with the response.
//         // The actual data is found on this.responseText
//         // alert(this.responseText); // Will alert: 42

//         // Convert data from php to javascript
//         var data = this.responseText;
//         // console.log(data);
//         console.log(data);
//         datajson = JSON.parse(data);
//         console.log(datajson.main);
//         // console.log(allData);
//         return datajson.main.temp;

//     };
//     oReq.open("get", "http://api.openweathermap.org/data/2.5/weather?q=phoenix&APPID=d65bb6fca23cbd6681e7005e2f6f58d0&units=imperial", true);
//     //                               ^ Don't block the rest of the execution.
//     //                                 Don't wait until the request finishes to
//     //                                 continue.
//     oReq.send();
//     // console.log(dataArray);
//     // return dataArray;
// }