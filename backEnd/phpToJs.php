<?php
    select_query("SELECT * FROM waters");

    function get_pw() {
        $myfile = fopen("../backEnd/password.txt", "r");
        $pw = fread($myfile,filesize("../backEnd/password.txt"));
        return $pw;

    }
    function db_connection() {
        // Establish DB Connection
        $dbhost = "127.0.0.1";
        $dbuser = "root";
        $dbpass = get_pw();
        $db = "az_water_info";

        // Create connection
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

        // Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        }
        
        return $conn;
    }

    function select_query(string $sql) {
        $conn = db_connection();
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo $row["id"],",",$row["name"], ",", $row["rating"],",",$row["created_at"],"\n";
        }
        } else {
        echo "0 results";
        }
        $conn->close();

    }
?>