<?php
    if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['myButton']))
    {
        func();
    }
    function func()
    {
        echo "YOYO we pressed the button!";  
        include_once("../backEnd/connection.php");
        db_connection();

        $sql = "SELECT * FROM waters";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
        }
        } else {
        echo "0 results";
        }
$conn->close();
    }
?>
