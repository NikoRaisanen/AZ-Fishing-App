// Ajax to import sql query results from php to js

var dataArray;
function get_data() {

        var oReq = new XMLHttpRequest(); // New request object
        oReq.onload = function() {
            // This is where you handle what to do with the response.
            // The actual data is found on this.responseText
            // alert(this.responseText); // Will alert: 42

            // Convert data from php to javascript
            var data = this.responseText;
            // console.log(data);
            dataArray = data.split("\n");
            // console.log(dataArray);
            // console.log(typeof dataArray);
            // return dataArray;
            // alert(dataArray);
        };
        oReq.open("get", "../backEnd/phpToJs.php", true);
        //                               ^ Don't block the rest of the execution.
        //                                 Don't wait until the request finishes to
        //                                 continue.
        oReq.send();
        // console.log(dataArray);
        // return dataArray;
}

// function print_results() {
//     dataArray = get_data();
//     console.log(dataArray);
// }

function data_to_js() {
//     dataArray2 = get_data();
//     console.log("This is beginning of data_to_js\n");
//     console.log(dataArray2);
//     // console.log(typeof dataArray);
//     console.log("THis is end of data_to_js]n");
    // dataArray = get_data();
    console.log("data_to_js output " + dataArray);
    console.log(typeof dataArray);
}