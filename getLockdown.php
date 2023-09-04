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

$sql = "SELECT item, contents FROM settings";
$result = $conn->query($sql);

// echo $result;
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    if ($row["item"]=="lockdown-mode") {
        echo $row["contents"];
    }
  }
} else {
  echo "error";
}
$conn->close();
?>