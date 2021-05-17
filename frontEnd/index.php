<?php 
    include_once("../backEnd/connection.php"); get_pw(); db_connection(); 
?>
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>AZ Fishing Guide</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
<link rel="stylesheet" href="style.css">
<body onload="print_results()">
    <!-- <script>
        // function reqListener () {
        // console.log(this.responseText);
        // }

        var oReq = new XMLHttpRequest(); // New request object
        oReq.onload = function() {
            // This is where you handle what to do with the response.
            // The actual data is found on this.responseText
            alert(this.responseText); // Will alert: 42

            // Convert data from php to javascript
            var data = this.responseText;
            console.log(data);
            var dataArray = data.split("\n");



        };
        oReq.open("get", "../backEnd/phpToJs.php", true);
        //                               ^ Don't block the rest of the execution.
        //                                 Don't wait until the request finishes to
        //                                 continue.
        oReq.send();
    </script> -->
    <h1 id="mainHeader">Niko's AZ Fishing Guide</h1>
    <form action="../backEnd/queries.php" method="post">
        <input type="submit" name="myButton" value="GO" />
    </form>

    <div id="content">
        <!-- Use js to populate this -->
    </div>
<script src="script.js"></script>
</body>
</html>


<!--
Allow filtering based on name, rating, region, weather (implement later)
Put picture of each body of water next to result
Display them from top to bottom at center of page.
Info to show for each entry:
1.) name, rating, region, weather, image
2.) "Read more" that links to AZFGD fishing forecast










 -->