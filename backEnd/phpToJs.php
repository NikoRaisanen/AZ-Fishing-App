<?php
    $today = date("Y-m-d"); 
    select_query("SELECT * FROM waters WHERE created_at = '$today'");

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

    // Get results in json format and pass to AJAX
    function select_query(string $sql) {
        $conn = db_connection();
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
        // echo [ to represent beginning of json
        echo "[";
        while($row = $result->fetch_assoc()) {
            echo json_encode($row);
            if ($row["id"] == $result->num_rows) {
                echo "]";
            } else {
                echo ",\n";
            }
        }
        } else {
        echo "0 results";
        }
        $conn->close();

    }
?>