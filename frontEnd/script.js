// Ajax to import sql query results from php to js
var allData;
var testvar = "hi";
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
            // console.log(data);
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

function execute_this() {
    get_data();
    console.log(allData);
    console.log(testvar);
}

function printing_var() {
    console.log(allData);
}

function populate_results() {
    const app = document.getElementById('root');
    const logo = document.createElement('img');
    logo.src = 'lake.jpg';
    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    app.appendChild(logo);
    app.appendChild(container);
    var output = '';
    for (var entry of allData) {
        console.log(entry.id);
        output += entry.rating;

        id = entry.id;
        rating = entry.rating;
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const h1 = document.createElement('h1');
        h1.textContent = id;

        const p = document.createElement('p');
        p.textContent = rating;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        // textfield = document.createElement('p');
        // textfield.textContent = 'HELLOOOOOOOOOOOOO';
        // card = document.createElement('div');
        // card.setAttribute('class', 'card');
        // card.setAttribute('style', 'width: 18rem;');
        // img = document.createElement('img');
        // img.setAttribute('src', 'lake.jpg');
        // cbody = document.createElement('div');
        // cbody.setAttribute('class', 'card-body');

        

        // contentArea = document.getElementById('content');
        // contentArea.appendChild(card);
        // contentArea.appendChild(img);
        // contentArea.appendChild(cbody);
    }
    document.getElementById("testcontent").innerHTML = output;
}