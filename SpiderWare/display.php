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

$sql = "SELECT * FROM SpiderWareData";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "ip: " . $row["ip"]. " - lastUpdated: " . $row["lastUpdated"]. " - jsonData" . $row["jsondata"]. "<br>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>