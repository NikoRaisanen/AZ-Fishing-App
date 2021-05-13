<?php
    if($_SERVER['REQUEST_METHOD'] == "POST" and isset($_POST['myButton']))
    {
        func();
    }
    function func()
    {
        echo "YOYO we pressed the button!";  
    }
?>
