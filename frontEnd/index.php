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
<body onload="set_allData()">
    <!-- Create big button that says "Get started" 
    also show text explaining what the app is-->

    <h1 id="mainHeader">Niko's AZ Fishing Guide</h1>
    <br>
    <br>
    <br>
    <div id="introdiv">
        <p id="intro" class="text-wrap text-justify">This application was created to help Arizona fisherman decide which body of water they should spend their day at. Arizona fishing reports can be found all over the web, but most sources are outdated and lack the ability to filter by the parameters that are most important to you.
        <br>
        <br>
        All results on this page are timely as they are pulled daily from the official AZFGD website. The unique element of this application is the ability to filter results based on several fields, including the weather of each location.
        </p>
    </div>
    <br>
    <br>
    <div class="text-center">
        <input id="getstarted" class="btn btn-primary btn-lg" type="button" value="Get started!" onclick="order_by_name()">
    </div>
        <div id="searchdiv" class='centerdata' style='display:none;'>
            <label for="search">Order by:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <select id="search" name="search" onchange="update_search(value)">
                <option disabled selected value> -- select an option -- </option>
                <option value="name" selected="selected">Name</option>
                <option value="rating">Rating</option>
                <option value="region">Region</option>
            </select>
        </div>


    <div id="content" class="d-flex flex-wrap">
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