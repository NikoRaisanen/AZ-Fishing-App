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

        // BEGINNING OF WORKING CARDS --
        id = entry.id;
        rating = entry.rating;
        card = document.createElement('div');
        card.setAttribute('class', 'card centerdata');
        // Modify the below width so that all content scales
        card.setAttribute('style', 'width: 30rem');
        img = document.createElement('img');
        img.setAttribute('src', 'lake.jpg');
        img.setAttribute('class', 'card-img-top');
        cbody = document.createElement('div');
        cbody.setAttribute('class', 'card-body');
        h5 = document.createElement('h5');
        h5.setAttribute('class', 'card-title');
        h5.textContent = 'Card Title AAAAAAAAAAAAAAAAAAAAAAAAAA BBBBBBBBBBBBBBBBBBBBBBBBBBBB CCCCCCCCCCCCCCCCCCCC';
        p1 = document.createElement('p');
        p1.setAttribute('class', 'card-text');
        p1.textContent = 'Example text :D';

        // END OF WORKING CARDS --
        
        // card = document.createElement('div');
        // // card.setAttribute('style', 'width: 100px');
        // card.setAttribute('class', 'col-12');
        // card.setAttribute('style', 'height: 2000px');
        // card.setAttribute('style', 'background-color: #C0C0C0');

        // imgdiv = document.createElement('div');
        // // imgdiv.setAttribute('style', 'width: 100%');
        // imgdiv.setAttribute('class', 'col-2');
        // img = document.createElement('img');
        // img.src = 'lake.jpg';
        // img.setAttribute('class', 'col-12');
        // cbody = document.createElement('div');
        // cbody.setAttribute('class', 'card-body');
        // cbody.setAttribute('stlye', 'background-color: green');
        // p1 = document.createElement('p');
        // p1.textContent = 'p1 test goes here!!!';

        card.appendChild(img);
        cbody.appendChild(h5);
        cbody.appendChild(p1);
        card.appendChild(cbody);

        contentArea = document.getElementById('content');

        contentArea.appendChild(card);
        // card.appendChild(cbody);
        // card.appendChild(h5);
        // contentArea.appendChild(card);
        // Add line break to differentiate cards
        br = document.createElement('br');
        contentArea.appendChild(br);
    }
    document.getElementById("testcontent").innerHTML = output;
}