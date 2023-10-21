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

  $usernameGet = $_GET['username'];
  $messageGet = $_GET['message'];
  $roomId = $_GET['roomId'];



  echo "Posting message...<br>";

  $sql = "INSERT INTO messages2 (sender, message, roomId) VALUES ('$usernameGet', '$messageGet', $roomId)";
  $result = $conn->query($sql);

  echo $result." ".$conn -> error;
  echo "<script>var chatroomId=$roomId;</script>";

  
  $conn->close();
  ?>
    <script>
        window.location=('./view.php?roomId='+chatroomId);
    </script>
  