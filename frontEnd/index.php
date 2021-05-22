<p id='trash' style='display:none;'>
<?php 
    include_once("../backEnd/phpToJs.php"); 
?>
</p>

<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>AZ Fishing Guide</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
<link rel="stylesheet" href="style.css">
<body onload="execute_this()">
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
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
        <input id="clickMe" type="button" value="clickme" onclick="populate_results()">
        <input id="orderbyRating" type="button" value="Order by rating" onclick="order_by_rating()">
        <input id="resetallData" type="button" value="Reset allData" onclick="reset_allData()">
    <div id="content">
        <p id="testcontent">This is testcontent</p>
        <!-- Use js to populate this -->
    </div>
    <div id="root"></div>
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