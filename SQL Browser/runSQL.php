<?php

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

  $ipAddress = $_SERVER['REMOTE_ADDR'];


  $sql = "DELETE FROM messages2 WHERE 1";
  $result = $conn->query($sql);

  echo $result." ".$conn -> error;
  
  $conn->close();
  ?>