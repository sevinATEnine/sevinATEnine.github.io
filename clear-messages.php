<?php 
    if ($_GET['auth']=="!312645root.com/eat~") {
        $servername = "localhost";
        $username = "elem435_cst_usr";
        $password = "#3rm|n@2";
        $dbname = "elem435_cst";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        }

        $sql = "DELETE FROM Messages";
        $result = $conn->query($sql);

        if ($result) {
            echo("Success");
        } else {
            echo("Error");
        };
        $conn->close();

    } else {
        echo('Could not clear messages, due to invalid auth.');
    }
?>