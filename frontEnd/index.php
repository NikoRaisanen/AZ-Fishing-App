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
        <input id="getstarted" type="button" value="Get started!" onclick="order_by_name()">
        <p id="intro">Hello this is my intro paragraph!</p>
        <!-- <input id="orderbyRating" type="button" value="Order by rating" onclick="order_by_rating()">
        <input id="orderbyName" type="button" value="Order by name" onclick="order_by_name()">
        <input id="orderbyRegion" type="button" value="Order by region" onclick="order_by_region()">
        <input id="resetallData" type="button" value="Reset allData" onclick="reset_allData()"> -->
        <div id="searchdiv" class='centerdata' style='display:none;'>
            <label for="search">Order by:</label>
            <select id="search" name="search" onchange="update_search(value)">
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="region">Region</option>
            </select>
        </div>


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