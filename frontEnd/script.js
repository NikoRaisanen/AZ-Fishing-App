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
    for (var entry of allData) {
        console.log(entry.id);
        document.getElementById("testcontent").innerHTML = entry.id;
    }
}